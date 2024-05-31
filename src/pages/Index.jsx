import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Text, VStack, HStack, Image } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!running && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running, time]);

  const formatTime = (time) => {
    const getSeconds = `0${(time % 60)}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleSplitReset = () => {
    if (running) {
      console.log(`Split at ${formatTime(time)}`);
    } else {
      setTime(0);
    }
  };

  const handleOnOff = () => {
    setOn(!on);
    if (on) {
      setRunning(false);
      setTime(0);
    }
  };

  if (!on) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Button onClick={handleOnOff} colorScheme="red">On</Button>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Image src="/images/stopwatch.png" alt="Stopwatch" boxSize="150px" />
        <Text fontSize="4xl" fontFamily="monospace">{formatTime(time)}</Text>
        <HStack spacing={4}>
          <Button onClick={handleStartStop} colorScheme="green">{running ? 'Stop' : 'Start'}</Button>
          <Button onClick={handleSplitReset} colorScheme="yellow">{running ? 'Split' : 'Reset'}</Button>
          <Button onClick={handleOnOff} colorScheme="red">Off</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;