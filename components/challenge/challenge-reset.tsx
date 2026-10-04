"use client";

import { useRef } from "react";

export function ChallengeReset({
  hasAttempts,
  disabled,
  onReset,
  completed = false,
}: {
  hasAttempts: boolean;
  disabled: boolean;
  onReset: () => void;
  completed?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <div className="challenge-reset">
      <button
        className="secondary"
        disabled={disabled}
        onClick={() => (hasAttempts ? dialog.current?.showModal() : onReset())}
      >
        {completed ? "Bắt đầu chu trình thiết kế mới" : "Bắt đầu lại thử thách"}
      </button>
      <dialog ref={dialog} aria-labelledby="reset-title" aria-describedby="reset-description">
        <h2 id="reset-title">Bắt đầu lại thử thách?</h2>
        <p id="reset-description">Sổ tay kỹ sư và toàn bộ dữ liệu thử nghiệm hiện tại sẽ bị xóa.</p>
        <div className="actions">
          <button className="secondary" autoFocus onClick={() => dialog.current?.close()}>
            Tiếp tục thử thách
          </button>
          <button
            className="primary"
            onClick={() => {
              dialog.current?.close();
              onReset();
            }}
          >
            Xóa dữ liệu và bắt đầu lại
          </button>
        </div>
      </dialog>
    </div>
  );
}
