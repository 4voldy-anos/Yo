module.exports = {
  config: {
    name: "inbox",
    aliases: ["in"],
    version: "1.0",
    author: "Christus",
    countDown: 10,
    role: 0,
    shortDescription: {
      fr: "commande inbox créée par @Christus"
    },
    longDescription: {
      fr: ""
    },
    category: "fun",
    guide: {
      fr: ""
    }
  },
  langs: {
    fr: {
      gg: ""
    },
    id: {
      gg: ""
    }
  },
  onStart: async function({ api, event, args, message }) {
    try {
      const query = encodeURIComponent(args.join(' '));
      message.reply(
        "✅ MESSAGE ENVOYÉ AVEC SUCCÈS\n\n⚡ VEUILLEZ VÉRIFIER VOTRE BOÎTE DE RÉCEPTION OU LES DEMANDES DE MESSAGES",
        event.threadID
      );
      api.sendMessage(
        "✅ AUTORISATION ACCORDÉE AVEC SUCCÈS\n AUTORISATION ACCORDÉE AVEC SUCCÈS\n㊙️ VOUS POUVEZ MAINTENANT UTILISER 🫠 SALUT,
        event.senderID
      );
    } catch (error) {
      console.error("Erreur frérot : " + error);
    }
  }
    }
