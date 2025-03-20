// assets/terminal.js
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
  
    // Define available commands with responses
    const commands = {
      help: "Available commands: help, bio, projects, social, art, time, clear",
      bio: "Internationally Exhibited Artist | World Record Guitarist | Save The World With Art™ | Fully On-Chain.",
      projects: "Explore my projects: GitHub, SVG-Animation-Creator, spritesheet-to-svg-animator-tool, STWWAartprize, savetheworldwithart-ghostnet, and more.",
      social: "Connect with me on all platforms: \nTwitter: https://twitter.com/jams2blues\nInstagram: https://instagram.com/jams2blues\nGitHub: https://github.com/jams2blues\nYouTube: https://youtube.com/@jams2blues",
      art: "My 'Counterchange Tessellation: Abundance' NFT is a one-of-a-kind fractal tapestry—where geometry meets chaos. View it on Objkt: https://objkt.com/tokens/KT1KyEo6DeKzpxCT1qusrgPJt5noWdiEpYPJ/3",
      time: () => `Current time: ${new Date().toLocaleTimeString()}`,
    };
  
    // Process and return the command's response
    function processCommand(cmd) {
      const lowerCmd = cmd.toLowerCase();
      if (commands.hasOwnProperty(lowerCmd)) {
        return (typeof commands[lowerCmd] === 'function') ? commands[lowerCmd]() : commands[lowerCmd];
      }
      return "Command not recognized. Type 'help' for available commands.";
    }
  
    // Append text to the terminal output and auto-scroll
    function appendOutput(text) {
      output.textContent += "\n" + text;
      output.scrollTop = output.scrollHeight;
    }
  
    // Handle command input events
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const command = input.value.trim();
        if (command !== "") {
          appendOutput("> " + command);
          if (command.toLowerCase() === "clear") {
            output.textContent = "";
          } else {
            const result = processCommand(command);
            appendOutput(result);
          }
          input.value = "";
        }
      }
    });
  });
  