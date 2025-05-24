module.exports = (body) => {
  return {
    characterCount: body.length,
    keywords: body.split(" ").splice(0, 3),
    fakeResponseRate: `${Math.floor(Math.random() * 100)}%`,
    aiHint: "Your campaign likely targets finance users",
  };
};
