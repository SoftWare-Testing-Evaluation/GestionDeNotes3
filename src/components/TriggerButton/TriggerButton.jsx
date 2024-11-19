// React import
import React from 'react';
import { ControlPoint } from "@mui/icons-material";

import './trigger_button.css'
import Button from '../Button/Button.jsx';

const Trigger = ({ triggerText, buttonRef, showModal, bg, fg, isCustom = false, button }) => {
  return (
    <div className="new-admin"
      ref={buttonRef}
      onClick={showModal}
    >
      <div style={{ backgroundColor: bg, color: fg }} className="trigger-style">

        {
          isCustom ?
            button
            :
            <Button icon={<ControlPoint />} text={triggerText} height='2.5rem' />
        }
        {/* <button
          className="center modal-button"
          style={{backgroundColor:bg, color:fg, border:`1px solid ${bg}`}}
          >
          {}
          </button> */}

      </div>
    </div>
  );
};
export default Trigger;
