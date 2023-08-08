export const mapper = () => {
    let newModuleMapper = moduleMapper;

    if (Object.keys(newModuleMapper).length === 0)
      Object.keys(userInput.umodules).forEach((id) => {
        userInput.umodules[id].activities.forEach((activity) => {
          newModuleMapper = {
            ...newModuleMapper,
            [Object.keys(newModuleMapper).length + 1]: id + "." + activity,
          };
        });
      });

}