const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now(),
    text: input,
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  const userQuery = input;
  setInput("");
  setIsLoading(true);

  try {
    // Use Gemini SDK instead of raw fetch
    const result = await model.generateContent(
      `You are an agricultural assistant for Indian farmers in ${selectedLocation}.
       Answer in Hindi and English as appropriate.
       Focus on practical farming advice, crop management, fertilizers, government schemes,
       and agricultural best practices specific to ${selectedLocation} region.
       User query: ${userQuery}`
    );

    const aiResponseText =
      result.response.text() || "Sorry, I couldn't generate a response. Please try again.";

    const botResponse: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
  } catch (error) {
    console.error("Gemini API Error:", error);

    const fallbackResponse: Message = {
      id: Date.now() + 1,
      text: generateLocalFallback(userQuery),
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, fallbackResponse]);

    toast({
      title: "Using Offline Mode",
      description: "AI service temporarily unavailable. Using local knowledge base.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }

  setTimeout(scrollToBottom, 100);
};
