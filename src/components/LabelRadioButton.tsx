import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode} from "react";

type Props = {
  name: string;
  value: string;
  icon: IconDefinition;
  onClick: () => void;
  label: ReactNode;
  defaultChecked?: boolean;
};

export default function LabelRadioButton({
  name,value,icon,onClick,label,defaultChecked=false
}:Props) {
  return (
    <label
      className="radio-btn group">
      <input
        onClick={() => onClick()}
        className="hidden"
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        value={value}/>
      <span className="icon group-has-[:checked]:bg-blue-500 group-has-[:checked]:text-white">
        <FontAwesomeIcon icon={icon}/>
      </span>
      {label}
    </label>
  );
}