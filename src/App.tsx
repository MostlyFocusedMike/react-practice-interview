import { useState } from 'react'

// function Child() {
//   console.log('I am rendered CHILD:',);
//   return <div>
//     <p>I am the child</p>
//   </div>
// }

// function Parent({ children, }: { children: React.ReactNode }) {
//   console.log('I am rendered PARENT:',);
//   const [count, setCount] = useState(0)

//   const handleClick = () => {
//     setCount(count + 1);
//   }
//   return <div>
//     <button onClick={handleClick}>Click {count}</button>
//     <p>I am the Parent</p>
//     {children}
//   </div>
// }

interface LayoutProps {
  NavNode: React.ReactNode;
  FooterComponent: React.ComponentType<{ msg: string }>;
  // FooterComponent: React.ComponentType; // If there were no props
  children: React.ReactNode;
}

const Layout = ({ NavNode, children, FooterComponent }: LayoutProps) => {
  return (
    <>
      {NavNode}
      <main>{children}</main>
      <FooterComponent msg="bye fool" />
    </>
  );
};

function FooterComponent({ msg }: { msg: string }) {
  return <footer>
    <p>{msg}</p>
  </footer>
}


function App() {
  return <>
    <Layout
      NavNode={<h1>My Site</h1>}
      FooterComponent={FooterComponent}
    >
      <p>Hello!</p>
    </Layout>
  </>
}

export default App
