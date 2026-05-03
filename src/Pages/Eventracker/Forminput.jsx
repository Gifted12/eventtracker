import React from "react";
import {
  MdListAlt,
  MdEdit,
  MdSchedule,
  MdTimer,
  MdError,
  MdAdd,
  MdWork,
  MdSportsEsports,
  MdSchool,
  MdFitnessCenter,
  MdPeople,
  MdSelfImprovement,
} from "react-icons/md";

const Forminput = (props) => {
  const categoryIcons = {
    Work: <MdWork />,
    Play: <MdSportsEsports />,
    Study: <MdSchool />,
    Exercise: <MdFitnessCenter />,
    Social: <MdPeople />,
    "Self-Care": <MdSelfImprovement />,
  };

  return (
    <div className="works-form">
      <form className="admin-form" onSubmit={props.submitt} noValidate>
        <div className="form-header">
          <h3 className="form-title">
            {props.editing ? "Edit Event" : "Add New Event"}
          </h3>
          <p className="form-subtitle">
            {props.editing
              ? "Update your event details"
              : "Track your daily activities"}
          </p>
        </div>

        <fieldset className="form-section">
          <legend className="sr-only">Event Details</legend>
          <div className="topwrapper">
            <div className="category-group">
              <div className="form-group">
                <label htmlFor="category-select" className="form-label">
                  Category <span className="required">*</span>
                </label>

                <div className="input-wrapper">
                  <select
                    id="category-select"
                    className="form-select"
                    onChange={(e) => {
                      props.selectstate(e.target.value);
                      props.clearError && props.clearError("");
                    }}
                    value={props.category || "Work"}
                  >
                    <option value="Work">Work</option>
                    <option value="Play">Play</option>
                    <option value="Study">Study</option>
                    <option value="Exercise">Exercise</option>
                    <option value="Social">Social</option>
                    <option value="Self-Care">Self-Care</option>
                  </select>
                  <div className="input-icon">
                    {categoryIcons[props.category] || <MdListAlt />}
                  </div>
                </div>

                
              </div>
                  <div className="duration-value">
                    {(() => {
                      try {
                        if (!props.start || !props.end) return "—";
                        const [sh, sm] = props.start.split(":").map(Number);
                        const [eh, em] = props.end.split(":").map(Number);
                        if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em))
                          return "—";
                        const now = new Date();
                        const s = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate(),
                          sh,
                          sm,
                          0,
                          0,
                        ).getTime();
                        const e = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate(),
                          eh,
                          em,
                          0,
                          0,
                        ).getTime();
                        if (e <= s) return "—";
                        const mins = Math.round((e - s) / 60000);
                        const h = Math.floor(mins / 60);
                        const m = mins % 60;
                        return h > 0 ? `${h}h ${m}m` : `${m}m`;
                      } catch (err) {
                        return "—";
                      }
                    })()}
                  </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start-time" className="form-label">
                  Start Time <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="start-time"
                    type="time"
                    className="form-input"
                    value={props.start ?? ""}
                    onChange={(e) => {
                      props.startstate(e.target.value);
                      props.clearError && props.clearError("");
                    }}
                    aria-describedby="start-help"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="end-time" className="form-label">
                  End Time <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="end-time"
                    type="time"
                    className="form-input"
                    value={props.end ?? ""}
                    onChange={(e) => {
                      props.endstate(e.target.value);
                      props.clearError && props.clearError("");
                    }}
                    aria-describedby="end-help"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-textarea" className="form-label">
              Task Description <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <textarea
                id="task-textarea"
                className="form-textarea"
                placeholder="Describe what you'll be doing..."
                value={props.content ?? ""}
                onChange={(e) => {
                  props.textareastate?.(e.target.value);
                  props.clearError && props.clearError("");
                }}
                autoComplete="off"
                spellCheck="true"
                aria-describedby="task-help"
                maxLength={500}
              />

            </div>
            <div className="form-help">
              <span id="task-help">Be specific about your task</span>
              <span className="char-count">
                {String(props.content ?? "").length}/500
              </span>
            </div>
          </div>
        </fieldset>

        {props.error && (
          <div className="form-error" role="alert" aria-live="polite">
            <div className="error-icon">
              <MdError />
            </div>
            <span>{props.error}</span>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className={`form-submit ${props.saving ? "loading" : ""}`}
            disabled={props.saving}
            aria-describedby="submit-help"
          >
            {props.saving ? (
              <>
                <span className="spinner"></span>
                {props.editing ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <span className="button-icon">
                  {props.editing ? <MdEdit /> : <MdAdd />}
                </span>
                {props.editing ? "Update Event" : "Add Event"}
              </>
            )}
          </button>
          <div id="submit-help" className="sr-only">
            {props.editing
              ? "Save your changes to the event"
              : "Add this event to your tracker"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forminput;
