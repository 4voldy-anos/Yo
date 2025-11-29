const axios = require('axios');
const { getStreamFromURL } = global.utils;
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  config: {
    name: "fluxx",
    version: "1.0",
    author: "Christus",
    countDown: 20,
    longDescription: {
      fr: "Génère rapidement des images IA avec Fluxx (API de Christus)."
    },
    category: "générateur d'image 2",
    role: 0,
    guide: {
      fr: "{pn} <prompt>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const prompt = args.join(' ').trim();
    if (!prompt) return message.reply("⚠️ Veuillez fournir un prompt pour générer l'image.");

    api.setMessageReaction("⌛", event.messageID, () => {}, true);
    message.reply("⚡ Fluxx génère vos images. Veuillez patienter...", async () => {
      try {
        // ✅ API Fluxx
        const apiUrl = `http://65.109.80.126:20511/api/fluxx?prompt=${encodeURIComponent(prompt)}`;
        const response = await axios.get(apiUrl);

        if (!response?.data?.status || !Array.isArray(response.data.images) || response.data.images.length !== 4) {
          api.setMessageReaction("❌", event.messageID, () => {}, true);
          return message.reply("❌ La génération de l'image a échoué. Essayez un autre prompt.");
        }

        const imageLinks = response.data.images;
        const imageObjs = await Promise.all(imageLinks.map(url => loadImage(url)));

        const canvas = createCanvas(1024, 1024);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(imageObjs[0], 0, 0, 512, 512);
        ctx.drawImage(imageObjs[1], 512, 0, 512, 512);
        ctx.drawImage(imageObjs[2], 0, 512, 512, 512);
        ctx.drawImage(imageObjs[3], 512, 512, 512, 512);

        const cacheDir = path.join(__dirname, 'cache');
        fs.mkdirSync(cacheDir, { recursive: true });

        const fileName = `fluxx_collage_${event.senderID}_${Date.now()}.png`;
        const outputPath = path.join(cacheDir, fileName);

        const out = fs.createWriteStream(outputPath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);

        out.on("finish", async () => {
          api.setMessageReaction("✅", event.messageID, () => {}, true);
          const msg = {
            body: "✅ L'image Fluxx est prête !\n\n❏ Répondez avec U1, U2, U3 ou U4 pour en choisir une.",
            attachment: fs.createReadStream(outputPath)
          };
          message.reply(msg, (err, info) => {
            if (!err) {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                images: imageLinks
              });
            }
          });
        });

      } catch (error) {
        console.error(error);
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        message.reply("🚫 Une erreur est survenue lors de la génération de l'image. Veuillez réessayer plus tard.");
      }
    });
  },

  onReply: async function ({ api, event, Reply, message }) {
    const { author, images } = Reply;
    if (event.senderID !== author) {
      return message.reply("⚠️ Seule la personne ayant lancé la commande peut sélectionner une image.");
    }

    const input = event.body.trim().toUpperCase();
    const match = input.match(/^U([1-4])$/);
    if (!match) {
      return message.reply("❌ Entrée invalide. Répondez avec U1, U2, U3 ou U4.");
    }

    const index = parseInt(match[1]) - 1;
    const selectedImage = images[index];

    try {
      const imageStream = await getStreamFromURL(selectedImage, `fluxx_selection_U${index + 1}.jpg`);
      message.reply({
        body: `🖼️ Voici votre image sélectionnée (U${index + 1}) de Fluxx.`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("🚫 Impossible de récupérer l'image sélectionnée. Veuillez réessayer.");
    }
  }
};
