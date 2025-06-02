import {
  Flex
} from "@chakra-ui/react";
import React from "react";
import Homepage from "./Homepage.jsx";
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'
function App() {
  return (

    <header>
      <SignedOut>
        <div style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Flex minH="100vdh">
          <Homepage />
        </Flex>
      </SignedIn>
    </header>
  );
}

export default App;