import {useState, useEffect, useRef} from "react";

/*Dropdown menu for message controls*/
const DropdownMenu = ({editComponent, deleteComponent}) => {
  const [open, setOpen] = useState(false); //Whether the dropdown is open
  const dropdownRef = useRef(null); //Reference to the containing div element

  //Open and close the dropdown section
  const handleDropdownClick = (event) => {
    event.stopPropagation();

    setOpen(!open);
  };

  //Close dropdown if there's a click outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  //Manage event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  //Close dropdown and tell parent to edit
  const handleEdit = (event) => {
    event.stopPropagation();

    setOpen(false);
    editComponent();
  };

  //Close dropdown and tell parent to delete
  const handleDelete = (event) => {
    event.stopPropagation();

    setOpen(false);
    deleteComponent();
  };

  return (
    <div className={"dropdownMenu"} ref={dropdownRef}>
      <button className={"svgButton"} onClick={handleDropdownClick}>
        <span className={"material-icons linkLike interactive"}>more_vert</span>
      </button>
      {
        open &&
        <div className={"dropdownItems"}>

          <button className={"dropdownItem interactive hoverShine svgButton"} onClick={handleEdit}>
            <span className={"material-icons linkLike interactive"}>edit</span>
          </button>

          <button className={"dropdownItem interactive hoverShine svgButton"} onClick={handleDelete}>
            <span className={"material-icons linkLike interactive"}>delete</span>
          </button>
        </div>
      }
    </div>
  );
};

export default DropdownMenu;