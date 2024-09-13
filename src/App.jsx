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

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(r => r.json())
      .then(r => {
        setPosts(r.posts);
      });
  }, []);

  return (
    <>
      {posts.map(x =>
        <h3 key={x.id}> <a
          href={'#/posts/' + x.id}
          onClick={e => { e.preventDefault(); setPostId(x.id); }}
        >{x.title}</a></h3>
      )}
    </>
  )
}


function PostDetail({ postId, setPostId }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [savedComments, setSavedComments] = useState(localStorage.savedComments ? JSON.parse(localStorage.savedComments) : []);

  async function getData() {
    const postData = await fetch('https://dummyjson.com/posts/' + postId).then(r => r.json());
    const commentsData = await fetch(`https://dummyjson.com/posts/${postId}/comments`).then(r => r.json());

    setPost(postData);
    setComments(commentsData.comments);
  }

  useEffect(() => {
    localStorage.savedComments = JSON.stringify(savedComments);
  }, [savedComments]);

  useEffect(() => {
    getData();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setPostId(null);
  }

  function handAddComment(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObj = Object.fromEntries(formData);
    console.log(formObj);
    const newComment = {
      id: crypto.randomUUID(),
      body: formObj.body,
      postId,
      user: {
        id: crypto.randomUUID(),
        fullName: formObj.fullName,
      },
    };
    setSavedComments([...savedComments, newComment]);
    e.target.reset();
  }

  const postComments = savedComments.filter((x) => x.postId === postId);
  const totalComments = [...postComments, ...comments];

  return (
    <>
      <p><a href="#" className={styles.back} onClick={handleClick}>Back</a></p>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <hr />

      {totalComments.slice().reverse().map(
        (x, index) => (
          <p key={index}><strong>{x.user.fullName}</strong> says: {x.body}</p>
        )
      )}


      <form id="addComment" onSubmit={handAddComment}>
        <motion.div
          className={styles.inputContainer}
          whileHover={{ scale: 1.02 }} // Hover sırasında input alanı biraz büyüyecek
          transition={{ type: "spring", stiffness: 300 }} // Yumuşak bir animasyon
        >
          <motion.input
            className={styles.customInput} name='fullName' placeholder='name'
            whileFocus={{ scale: 1.02 }} // Focus sırasında input alanı biraz büyüyecek
          />
        </motion.div>
        <motion.div
          className={styles.inputContainer} 
          whileHover={{ scale: 1.02 }} // Hover sırasında input alanı biraz büyüyecek
          transition={{ type: "spring", stiffness: 300 }} // Yumuşak bir animasyon
        >
          <motion.textarea
            className={styles.customInput} name='body' placeholder='comment'
            whileFocus={{ scale: 1.02 }} // Focus sırasında input alanı biraz büyüyecek
          />
        </motion.div>
        <motion.button
          className={styles.customButton}
          whileHover={{ scale: 1.1 }} // Hover sırasında buton büyüyecek
          whileTap={{ scale: 0.95 }}  // Tıklama sırasında buton küçülecek
          transition={{ type: "spring", stiffness: 300 }} // Yumuşak bir animasyon
        >
          Add
        </motion.button>
      </form>


    </>
  )
}

function NotFound() {
  return (
    <p>Page not found. <a href="#/">return home</a></p>
  )
}

export default App
