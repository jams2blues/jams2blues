// assets/terminal.js
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  const commands = {
    help: "Commands: help, bio, projects, social, art, time, latest, linktree, solo, clear",
    bio: "Internationally Exhibited Artist | World Record Guitarist | Save The World With Art™ | Fully On-Chain.",
    projects: "Explore my projects: GitHub, SVG-Animation-Creator, spritesheet-to-svg-animator-tool, STWWAartprize, savetheworldwithart-ghostnet, and more.",
    social: "Connect with me:\nTwitter: https://twitter.com/jams2blues\nInstagram: https://instagram.com/jams2blues\nGitHub: https://github.com/jams2blues\nYouTube: https://youtube.com/@jams2blues",
    art: "My 'Counterchange Tessellation: Abundance' NFT is a one-of-a-kind fractal tapestry—where geometry meets chaos. View it on Objkt: https://objkt.com/tokens/KT1KyEo6DeKzpxCT1qusrgPJt5noWdiEpYPJ/3",
    time: () => `Current time: ${new Date().toLocaleTimeString()}`,
    latest: () => {
      return fetch("https://api.github.com/repos/jams2blues/jams2blues/commits?per_page=1")
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const commit = data[0];
            return `Latest commit:\n"${commit.commit.message}"\nby ${commit.commit.author.name} at ${new Date(commit.commit.author.date).toLocaleString()}`;
          }
          return "No commit data available.";
        })
        .catch(() => "Error fetching commit data.");
    },
    linktree: "Discover my digital showcase at: https://linktr.ee/jams2blues",
    solo: "World Record: 25h 15m of nonstop improvised guitar. Details on my Linktree: https://linktr.ee/jams2blues"
  };

  function appendOutput(text) {
    output.textContent += "\n" + text;
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(cmd) {
    const lowerCmd = cmd.toLowerCase();
    if (lowerCmd === "clear") {
      output.textContent = "";
      return;
    }
    if (commands.hasOwnProperty(lowerCmd)) {
      const result = commands[lowerCmd];
      if (typeof result === "function") {
        const res = result();
        if (res instanceof Promise) {
          res.then(text => appendOutput(text));
        } else {
          appendOutput(res);
        }
      } else {
        appendOutput(result);
      }
    } else {
      appendOutput("Command not recognized. Type 'help' for available commands.");
    }
  }

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const command = input.value.trim();
      if (command) {
        appendOutput("> " + command);
        processCommand(command);
        input.value = "";
      }
    }
  });
});
