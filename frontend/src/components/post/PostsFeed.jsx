import {useState, useEffect, useRef} from "react";

import {getPosts} from "../../api/PostController";
import PostCard from "./PostCard.jsx";
import useIntersectingObserver from "../../utils/IntersectionObserver";


const PostsFeed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [morePosts, setMorePosts] = useState(true); //Track whether there are more unfetched posts

  const listEndRef = useRef();
  const listEndReached = useIntersectingObserver(listEndRef);

  //Get posts from API and load them into state
  const loadPosts = async () => {
    const response = await getPosts(posts.length);

    const newPosts = posts.concat(response.posts);
    const isMore = response.isMore;

    setPosts(newPosts);
    setMorePosts(isMore);
  };

  //Load more posts when the end of the posts is reached
  useEffect(() => {
    if (!loading && morePosts && listEndReached) {
      setLoading(true);

      loadPosts().then(() => {
        setLoading(false);
      });
    }
  }, [listEndReached]);

  //Replace a post in the posts array
  const replacePost = (postIndex, newPost) => {
    let postsBuffer = [...posts];

    postsBuffer[postIndex] = newPost;

    setPosts(postsBuffer);
  };

  //Remove a post from posts array
  const removePost = (postIndex) => {
    let postsBuffer = [...posts];

    postsBuffer.splice(postIndex, 1);

    setPosts(postsBuffer);
  };

  return (
    <div className={"postsFeed"}>
      {/*List of posts*/}
      <ul className={"unstyledList"}>
        {
          posts.map((post, index) =>
            <li key={post._id}>
              <PostCard
                post={post}
                postsIndex={index}
                removePost={removePost}
                replacePost={replacePost}
              />
            </li>
          )
        }
      </ul>

      {/*End of list displays*/}
      <div className={"listEnd"} ref={listEndRef}>
        {
          listEndReached &&
          <>
            {
              morePosts &&
              <p>
                <span className={"material-icons loadingIcon"}>autorenew</span>
              </p>
            }
            {
              !morePosts &&
              <p>End of Posts</p>
            }
          </>
        }
      </div>
    </div>
  );
};


export default PostsFeed;