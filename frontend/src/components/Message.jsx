import {formatDate} from "../utils/Formatter";

/*User Messages, which can either be posts or comments*/
const Message = ({user, content, dates}) => {
  const displayDate = formatDate(dates.created);

  return (
    <div className={"message"}>
      {/*User Image Column*/}
      <div className={"messageImage interactive"}>
        <img className={"profilePicture"} src={user.image} alt={"profile picture"}/>
      </div>

      <div className={"messageContent"}>
        {/*Message Info*/}
        <span>
          <span className={"username interactive linkLike"}>{user.username}</span>
          <time>{displayDate}</time>
        </span>

        {/*Message Body*/}
        <div>
          <pre>
            {content}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default Message;