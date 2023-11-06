import { Switch } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";

export default function Checkbox ({ label, name, checked, onChange, disabled }) {
    return (
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">{label}</Switch.Label>
          <Switch
            checked={checked}
            onChange={onChange}
            name={name}
            disabled={disabled}
            className={`
              relative flex h-5 w-5 items-center justify-center transition-all duration-200 outline-none ring-1 
              ${!checked && !disabled ? "ring-gray-400" : ""}
              ${checked && !disabled ? "ring-red-400" : ""} 
              ${disabled ? "bg-gray-200 ring-gray-200" : ""}  
            `}
          >
            <AiOutlineCheck
              size="1rem"
              className={`
               ${checked ? "scale-100" : "scale-0"} 
               ${checked && !disabled ? "text-red-400" : "text-gray-400"} 
               transition-transform duration-200 ease-out`}
            />
          </Switch>
        </div>
      </Switch.Group>
    );
  }
