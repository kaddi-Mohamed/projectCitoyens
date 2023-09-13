exports.CreateNewDiscution = (ideaId, urlDiscution, dateDiscution) => {
  return {
    title: "Nouvelle discussion ajoutée : \n Partagez vos idées avec nous !",
    idea: ideaId,
    description:
      "Rejoignez la conversation ! Un nouvel URL de discussion a été \n ajouté à nos idées. Partagez vos réflexions et opinions avec nous !  url = " +
      urlDiscution +
      "\nRendez-vous le :" +
      dateDiscution,
  };
};

exports.publicationOfIdea = (ideaId) => {
  return {
    idea: ideaId,
    title: "Publication d'une nouvelle idée",
    description: `L'idée a été publiée le ${new Date().toLocaleDateString()}`,
  };
};
exports.PrivateIdea = (ideaId) => {
  return {
    idea: ideaId,
    title: "Idée rendue privée",
    description: `L'idée a été rendue privée le ${new Date().toLocaleDateString()}`,
  };
};

exports.createNewStatus = (ideaId, status) => {
  return {
    idea: ideaId,
    title: `Grande nouvelle : Cette idée a été en mode ${status}`,
    description:
      "Nous sommes heureux de vous informer que cette idée est maintenant en mode " +
      status +
      `  depuis le ${new Date().toLocaleDateString()}`,
  };
};
