import React, { useState } from 'react';
import type { LockPeriod } from '../types/lock';
import { LOCK_PRESETS, blocksToReadable, getLockWarningLevel } from '../lib/lockUtils';

interface LockPeriodSelectorProps {
  value: LockPeriod | null;
  onChange: (period: LockPeriod) => void;
}

const MIN_BLOCKS = 144;
const MAX_BLOCKS = 52_560; // ~1 year

export function LockPeriodSelector({ value, onChange }: LockPeriodSelectorProps) {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [customBlocks, setCustomBlocks] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);

  const handlePresetClick = (preset: LockPeriod) => {
    setAdvancedMode(false);
    setCustomBlocks('');
    setCustomError(null);
    onChange(preset);
  };

  const handleCustomChange = (raw: string) => {
    setCustomBlocks(raw);
    const n = parseInt(raw, 10);
    if (!raw || isNaN(n)) {
      setCustomError(null);
      return;
    }
    if (n < MIN_BLOCKS) {
      setCustomError(`Minimum is ${MIN_BLOCKS} blocks (~1 day)`);
      return;
    }
    if (n > MAX_BLOCKS) {
      setCustomError(`Maximum is ${MAX_BLOCKS} blocks (~1 year)`);
      return;
    }
    setCustomError(null);
    onChange({
      blocks: n,
      label: 'Custom',
      daysEstimate: Math.round((n * 10) / (60 * 24)),
    });
  };

  const warningLevel = value ? getLockWarningLevel(value.blocks) : 'none';

  return (
    <div className="lock-period-selector" role="group" aria-labelledby="lock-period-label">
      <p id="lock-period-label" className="lock-period-label">Select Lock Period</p>

      <div className="lock-preset-grid">
        {LOCK_PRESETS.map(preset => {
          const isSelected = !advancedMode && value?.blocks === preset.blocks;
          return (
            <button
              key={preset.blocks}
              type="button"
              className={`lock-preset-card${isSelected ? ' lock-preset-card--selected' : ''}`}
              onClick={() => handlePresetClick(preset)}
              aria-pressed={isSelected}
              aria-label={`Lock for ${preset.label} — approximately ${preset.daysEstimate} days, ${preset.blocks} blocks`}
            >
              <span className="lock-preset-label">{preset.label}</span>
              <span className="lock-preset-blocks">{preset.blocks.toLocaleString()} blocks</span>
              <span className="lock-preset-days">~{preset.daysEstimate} days</span>
            </button>
          );
        })}
      </div>

      <div className="lock-advanced-toggle">
        <button
          type="button"
          className="lock-advanced-btn"
          onClick={() => setAdvancedMode(prev => !prev)}
          aria-expanded={advancedMode}
        >
          {advancedMode ? 'Hide advanced' : 'Custom block count'}
        </button>
      </div>

      {advancedMode && (
        <div className="lock-custom-input">
          <label htmlFor="custom-blocks" className="lock-custom-label">
            Block count ({MIN_BLOCKS}–{MAX_BLOCKS.toLocaleString()})
          </label>
          <input
            id="custom-blocks"
            type="number"
            min={MIN_BLOCKS}
            max={MAX_BLOCKS}
            value={customBlocks}
            onChange={e => handleCustomChange(e.target.value)}
            placeholder={`e.g. ${MIN_BLOCKS}`}
            className={`lock-custom-field${customError ? ' lock-custom-field--error' : ''}`}
            aria-invalid={!!customError}
            aria-describedby={customError ? 'custom-blocks-error' : 'custom-blocks-hint'}
          />
          {customError && (
            <p id="custom-blocks-error" className="lock-custom-error" role="alert">{customError}</p>
          )}
          {!customError && customBlocks && !isNaN(parseInt(customBlocks, 10)) && (
            <p id="custom-blocks-hint" className="lock-custom-hint">
              ≈ {blocksToReadable(parseInt(customBlocks, 10))}
            </p>
          )}
        </div>
      )}

      {warningLevel === 'high' && (
        <div className="lock-warning" role="note" aria-label="Long lock period warning">
          <strong>Long lock period:</strong> your funds will be inaccessible for{' '}
          {value ? blocksToReadable(value.blocks) : 'an extended time'}. Make sure you won't need access.
        </div>
      )}

      {warningLevel === 'medium' && (
        <div className="lock-warning lock-warning--medium" role="note">
          <strong>Note:</strong> funds will be locked for approximately {value?.daysEstimate} days.
        </div>
      )}
    </div>
  );
}
