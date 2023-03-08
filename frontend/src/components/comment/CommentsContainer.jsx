import {useState, useRef, useEffect} from "react";

import {getComments} from "../../api/CommentController";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm";
import useIntersectingObserver from "../../utils/IntersectionObserver";


const CommentsContainer = ({postId}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [moreComments, setMoreComments] = useState(true); //Track whether there are more unfetched comments

  const listEndRef = useRef(); //Reference to div element displayed at the end of the list
  const listEndReached = useIntersectingObserver(listEndRef); //If we're at the bottom of the page. To load more comments or update bottom feedback


  //Get comments from API, add them, and set if there are more
  const loadComments = async () => {
    const response = await getComments(postId, comments.length);

    const newComments = comments.concat(response.comments);
    const isMore = response.isMore;

    setComments(newComments);
    setMoreComments(isMore);
  };


  //When at the bottom of the comments list, load more comments
  useEffect(() => {
    if (!loading && moreComments && listEndReached) {
      setLoading(true);

      loadComments().then(() => {
        setLoading(false);
      });
    }
  }, [listEndReached]);


  //Add a new comment to comments array
  const pushComment = (newComment) => {
    const commentsBuffer = [...comments];

    commentsBuffer.push(newComment);

    setComments(commentsBuffer);
  };


  //Replace a comment in the comments array
  const replaceComment = (commentIndex, newComment) => {
    const commentsBuffer = [...comments];

    commentsBuffer[commentIndex] = newComment;

    setComments(commentsBuffer);
  };


  //Remove a comment from comments array
  const removeComment = (commentIndex) => {
    const commentsBuffer = [...comments];

    commentsBuffer.splice(commentIndex, 1);

    setComments(commentsBuffer);
  };


  return (
    <div className={"commentsSection"}>
      {/*Comment box*/}
      <CommentForm postId={postId} closeForm={pushComment}/>

      {/*Comments list*/}
      <ul className={"unstyledList"}>
        {
          comments.map((comment, index) =>
            <li key={comment._id}>
              <Comment
                comment={comment}
                commentsIndex={index}
                replaceComment={replaceComment}
                removeComment={removeComment}
              />
            </li>
          )
        }
      </ul>

      {/*End of List displays*/}
      <div className={"listEnd"} ref={listEndRef}>
        {
          listEndReached &&
          <>
            {
              moreComments &&
              <p>
                <span className={"material-icons loadingIcon"}>autorenew</span>
              </p>
            }

            {
              !moreComments &&
              <>
                {
                  comments.length > 0
                    ?
                    <p>End of Comments</p>
                    :
                    <p>Be the first to comment!</p>
                }
              </>
            }
          </>
        }
      </div>
    </div>
  );
};


export default CommentsContainer;