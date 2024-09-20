import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useInView, motion } from 'framer-motion';
import styles from './App.module.css'
import useMousePosition from './useMousePosition';



const RouterContext = createContext(null);

const routes = [
  {
    id: crypto.randomUUID(),
    name: 'Home',
    url: '#/',
    element: <Home />,
  },
  {
    id: crypto.randomUUID(),
    name: 'About',
    url: '#/about',
    element: <About />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Posts',
    url: '#/posts',
    element: <Posts />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Contact',
    url: '#/contact',
    element: <Contact />,
  },
];

const notFound = {
  name: 'Page not found',
  element: <NotFound />,
  // url: '',
}

function getRoute(routeUrl) {
  const route = routes.find(x => x.url === routeUrl);
  return route ?? notFound;
}

const title = "App";

function setTitle(pageTitle) {
  document.title = `${pageTitle} - ${title}`;
}


function App() {
  // const [route, setRoute] = useState(location.hash.length < 2 ? '#/' : location.hash);
  // const [route, setRoute] = useState(location.hash.length < 2 ? routes[0] : getRoute(location.hash));
  const [route, setRoute] = useState(
    () => {
      if (location.hash.length < 2) {
        return routes[0];
      }

      return getRoute(location.hash);
    }
  );

  useEffect(() => {
    setTitle(route.name);
  }, [route]);

  useEffect(() => {
    window.addEventListener('hashchange', function () {
      setRoute(getRoute(location.hash));
    });
  }, []);

  return (
    <div className={styles.container}>
      <RouterContext.Provider value={route}>
        <Header />
        <Main />
        <Footer />
      </RouterContext.Provider>
    </div>
  )
}

function Main() {
  return (
    <div className={styles.main}>
      <Content />
    </div>
  )
}

function Header() {
  return (
    <div className={styles.header}>
      <a href="#/" className={styles.logo}>App</a>
      <Nav />
    </div>
  )
}

function Nav() {
  const route = useContext(RouterContext);

  return (
    <ul className={styles.nav}>
      {routes.map(x =>
        <li key={x.id}>
          <a href={x.url} className={route.url === x.url ? 'selected' : ''}>{x.name}</a>
        </li>)}
    </ul>
  )
}

function Content() {
  const route = useContext(RouterContext);

  return (
    <motion.div
      key={route.url}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={styles.content}
    >
      <h1>{route.name}</h1>
      {route.element}
    </motion.div>
  )
}

function Footer() {
  return (
    <div className={styles.footer}>&copy; 2024</div>
  )
}

function Sidebar() {
  const [postId, setPostId] = useState(null);

  return (
    <div className={styles.sidebar}>
      <div className={styles.widget}>
        <LikeBtn />
      </div>
    </div>
  )
}

function LikeBtn() {
  const [likeCount, setLikeCount] = useState(
    localStorage.likeCount ?
      parseInt(localStorage.likeCount) : 0
  );

  useEffect(() => {
    localStorage.likeCount = likeCount;
  }, [likeCount]);

  function increaseLikeCount() {
    setLikeCount(likeCount + 1);
  }

  return (
    <button className='likeBtn' onClick={increaseLikeCount}>😍 {likeCount}</button>
  )
}



function Home() {
  return (
    <>
      <div className={styles.containerer}>
        <MaskText />
        <MaskTextet />
        <MaskTextetet />
      </div>
    </>
  );
}

const phrases = ["Welcome to Our Website"];
const phrasese = ["We are excited to have you here!", "Explore our content and get", "to know more about what we offer."];
const phraseses = ["Stay updated with our posts.", "Learn more about us.", "Reach out via our contact page.", "Our mission is quality content.", "Content that meets your interests", "Explore our blog and stay informed!"];

export function MaskText() {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const animation = {
    initial: { y: "100%" },
    enter: i => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className={styles.body}>
      {
        phrases.map((phrase, index) => (
          <div key={index} className="lineMask">
            <motion.p custom={index} variants={animation} initial="initial" animate={isInView ? "enter" : ""}>
              {phrase}
            </motion.p>
          </div>
        ))
      }
    </div>
  );
}

export function MaskTextet() {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const animation = {
    initial: { y: "100%" },
    enter: i => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className={styles.body}>
      {
        phrasese.map((phrase, index) => (
          <div key={index} className="lineMask">
            <motion.p custom={index} variants={animation} initial="initial" animate={isInView ? "enter" : ""}>
              {phrase}
            </motion.p>
          </div>
        ))
      }
    </div>
  );
}

export function MaskTextetet() {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const animation = {
    initial: { y: "100%" },
    enter: i => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className={styles.body}>
      {
        phraseses.map((phrase, index) => (
          <div key={index} className="lineMask">
            <motion.p custom={index} variants={animation} initial="initial" animate={isInView ? "enter" : ""}>
              {phrase}
            </motion.p>
          </div>
        ))
      }
    </div>
  );
}

function About() {
  return (
    <>
      <div className={styles.containerer}>
        <MaskAbout />
      </div>
    </>
  );
}

const about = [
  "Welcome to our site!",
  "We deliver high-quality, engaging content.",
  "Find insights, stories, and knowledge.",
  "Meet our passionate team.",
  "Join our community of curious minds.",
  "Choose us for quality and creativity."
];


export function MaskAbout() {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const animation = {
    initial: { y: "100%" },
    enter: i => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className={styles.body}>
      {
        about.map((phrase, index) => (
          <div key={index} className="lineMask">
            <motion.p custom={index} variants={animation} initial="initial" animate={isInView ? "enter" : ""}>
              {phrase}
            </motion.p>
          </div>
        ))
      }
    </div>
  );
}

function Contact() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className={styles.mainin}>
      <motion.div
        className={styles.maske}
        animate={{
          WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }}>
          Follow us on social media to stay updated and be part of our community.
        </p>
      </motion.div>

      <div className={styles.bodyen}>
        <p>We’d <span>love to hear</span> from you! For any inquiries, feedback, or questions, feel free to contact us.</p>
      </div>
    </main>
  )
}



function Posts() {
  const [postId, setPostId] = useState(null);

  return (
    <>
      {postId ? <PostDetail postId={postId} setPostId={setPostId} /> : <PostList setPostId={setPostId} />}
    </>
  )
}

function PostList({ setPostId }) {
  const [posts, setPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({});

  useEffect(() => {
    async function dataget() {
      const response = await fetch('http://localhost:3000/api/posts');
      const posts = await response.json();
      setPosts(posts);
    }
    dataget();
  }, [newPost]);

  const handleNewPostForm = async (e) => {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    console.log(formObj);
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formObj)
    });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    console.log(data);
    setNewPost(data);
    e.target.reset();
  }

  return (
    <>
      <div className={styles.posts}>
        <div className={styles.listposts}>
          {posts.map(x =>
            <h3 key={x.id}> <a
              href={'#/posts/' + x.id}
              onClick={e => { e.preventDefault(); setPostId(x.id); }}
            >{x.title}</a></h3>
          )}
        </div>
        <div className={styles.addposts}>
          <h2>New Post</h2>
            <form onSubmit={handleNewPostForm}>
              <input className={styles.title} type="text" name="title" placeholder="title" /> <br />
              <textarea className={styles.textarea} name="content" id="" placeholder="content"></textarea> <br />
              <button className={styles.add}>Add</button>
            </form>
        </div>
      </div>
    </>
  )
}



function PostDetail({ postId, setPostId }) {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);



  useEffect(() => {
    async function getData() {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, [refresh]);

  const handleAddNewCommentForm = async (e) => {
    e.preventDefault();
    const formObj = Object.fromEntries(new FormData(e.target));
    console.log(formObj);

    const newComment = {
      ...formObj,
      postId: postId
    }


    try {
      const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newComment)
      })
      if (response.ok) {
        setRefresh(!refresh);
        formRef.current.reset();
      }
    } catch (e) {
      console.log(e);
      setError("bir hata oluştu");
    }

  }



  const handleLikeBtn = async (e) => {
    e.preventDefault();
    const commentId = e.target.value;
    const response = await fetch(`http://localhost:3000/api/comments/${commentId}?like=true`);
    if (!response.ok) {
      return;
    }
    setRefresh(!refresh);
  }

  const handleDisLikeBtn = async (e) => {
    e.preventDefault();
    const commentId = e.target.value;
    const response = await fetch(`http://localhost:3000/api/comments/${commentId}?dislike=false`);
    if (!response.ok) {
      return;
    }
    setRefresh(!refresh);
  }

  function handleClick(e) {
    e.preventDefault();
    setPostId(null);
  }

  return (
    <div className={styles.comments}>
        <p><a href="#" className={styles.back} onClick={handleClick}>Back</a></p>
      <div className={styles.icerik}>
          <div className={styles.gonderi}>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </div>
        <form ref={formRef} onSubmit={handleAddNewCommentForm}>
          <h2>Comment</h2>
          <textarea className={styles.textarea} name="content" id="" placeholder="Comment"></textarea> <br />
          <button className={styles.add}>post a comment</button>
        </form>
      </div>
      {data.comments?.reverse().map((comment, i) => (
        <div className={styles.comment} key={i}>
          <p>{comment.content}</p>
          <div className={styles.reaction}>
            <button onClick={handleLikeBtn} value={comment.id}><img src="./hover-like.gif" alt="like" /> {comment.likes}</button>
            <button onClick={handleDisLikeBtn} value={comment.id}><img src="./hover-dislike.gif" alt="dislike" /> {comment.dislikes}</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function NotFound() {
  return (
    <p>Page not found. <a href="#/">return home</a></p>
  )
}

export default App
