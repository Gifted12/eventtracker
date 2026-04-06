import React from 'react'

const Forminput = (props) => {
  return (
 <div className="works-form">
        <form className="admin-form" onSubmit={props.submitt} >
          <div>
            <div className="input-group">
              <label>Category</label>
                <select   onChange={e => { props.selectstate(e.target.value); props.clearError && props.clearError(""); }} value={props.category || "Work"}>
                  <option>Work</option>
                  <option>Play</option>
                  <option>Study</option>
                  <option>Exercise</option>
                  <option>Social</option>
                  <option>Self-Care</option>
                </select>
              </div>
          </div>
          <div className="input-group">
            <label>Task</label>
            <textarea
              value={props.content}
              onChange={e => { props.textareastate(e.target.value); props.clearError && props.clearError(""); }}
            />
          </div>
          <div className="row">
            <div className="input-group">
              <label>Start</label>
              <input
                type="time"
                value={props.start ?? ''}
                onChange={e => { props.startstate(e.target.value); props.clearError && props.clearError(""); }}
              />
            </div>
            <div className="input-group">
              <label>End</label>
              <input
                type="time"
                value={props.end ?? ''}
                onChange={e => { props.endstate(e.target.value); props.clearError && props.clearError(""); }}
              />
            </div>
          </div>
          <div className="input-group">
            <label>Duration</label>
            <p style={{marginTop:8}}>{(() => {
              try {
                if (!props.start || !props.end) return "—";
                const [sh, sm] = props.start.split(":").map(Number);
                const [eh, em] = props.end.split(":").map(Number);
                if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return "—";
                const now = new Date();
                const s = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0, 0).getTime();
                const e = new Date(now.getFullYear(), now.getMonth(), now.getDate(), eh, em, 0, 0).getTime();
                if (e <= s) return "—";
                const mins = Math.round((e - s) / 60000);
                const h = Math.floor(mins/60);
                const m = mins % 60;
                return h>0? `${h}h ${m}m` : `${m}m`;
              } catch (err) { return "—" }
            })()}</p>
          </div>
          {props.error ? <p style={{color:'salmon', marginTop:8}}>{props.error}</p> : null}
          <button type="submit">{props.editing? "Edit": "Add"}</button>
        </form>
      </div>
  )
}

export default Forminput
