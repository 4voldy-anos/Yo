const axios = require("axios");

const availableTEMPLATES = {
  "1": "Lumière Néon Multicolore",
  "2": "Style Galaxie Nom Libre",
  "3": "Texte 3D Sous l'Eau",
  "4": "Logo Viettel",
  "5": "Typographie sur Pavé",
  "6": "Texte 3D Cochon Mignon",
  "7": "Effet Lumière Néon Verte",
  "8": "Texte Lumière Futuriste",
  "9": "Graffiti Couverture",
  "10": "Texte Ailes du Diable Néon",
  "11": "Effets Glow Avancés",
  "12": "Texte Style Dragon Ball",
  "13": "Effet Texte Métal Bleu",
  "14": "Or Moderne",
  "15": "Effet Arbre Galaxie",
  "16": "Lettres Or en Ligne",
  "17": "Créateur Logo Mascottes Métal",
  "18": "Effet Texte Plasma",
  "19": "Texte Brouillard Manuscrit",
  "20": "Or Moderne 3",
  "21": "Logo Métal en Ligne",
  "22": "Lettres Graffiti",
  "23": "Effet Écriture Galaxie",
  "24": "Graffiti Texte 5",
  "25": "Texte Peinture Routière",
  "26": "Texte Chocolat",
  "27": "Logo Naruto Shippuden",
  "28": "Art Typographique en Couches",
  "29": "Écrire dans le Sable",
  "30": "Typographie Pinceau Vert",
  "31": "Texte Comic Boom",
  "32": "Texte Fissuré 3D",
  "33": "Texte Éclaboussure Peinture",
  "34": "Texte Glitch Numérique",
  "35": "Texte Dragon Steel",
  "36": "Graffiti Texte 3",
  "37": "Texte Zombie 3D",
  "38": "Effet Texte Matrix",
  "39": "Texte Lumière Néon Galaxie",
  "40": "Texte Métal 3D",
  "41": "Écriture Tableau Noir",
  "42": "Écriture sur Gâteaux",
  "43": "Texte Verre Humide",
  "44": "Ailes Ange Galaxie",
  "45": "Texte Bois 3D",
  "46": "Ballon Aluminium 3D",
  "47": "Texte Neige Noël",
  "48": "Texte Or Luxe",
  "49": "Avatar Hacker Anonyme",
  "50": "Texte Verre Cassé",
  "51": "Logo Style Blackpink",
  "52": "Texte Tissu Jean",
  "53": "Texte Brouillard Pluvieux",
  "54": "Ballon Aluminium Anniversaire",
  "55": "Effet Nuit Étoilée",
  "56": "Effet Découpage Papier",
  "57": "Texte Eau",
  "58": "Mot Lumière Verte Unique",
  "59": "Texte Plage 3D",
  "60": "Écriture Tableau Noir 2",
  "61": "Texte Feu Dragon",
  "62": "Texte Sous l'Eau",
  "63": "Texte Gâteau",
  "64": "Police Métal Impressionnante",
  "65": "Texte Effacé Gomme",
  "66": "Texte Métal en Ligne",
  "67": "Texte Danse",
  "68": "Texte Nuage dans le Ciel",
  "69": "Texte Eau 3D",
  "70": "Effet Texte Chrome",
  "71": "Effet Texte Bokeh",
  "72": "Texte Ampoule Incandescente",
  "73": "Nom Avatar Métal",
  "74": "Texte Hologramme 3D",
  "75": "Nuit Étoilée en Ligne",
  "76": "Effet Texte Or",
  "77": "Effet Texte Violet",
  "78": "Texte Glitch Pixel",
  "79": "Typographie Vert Foncé",
  "80": "Texte Diamant",
  "81": "Logo Néon Bleu",
  "82": "Effet Texte Néon",
  "83": "Texte Ombre",
  "84": "Texte Lumière Galaxie",
  "85": "Texte Titane",
  "86": "Effet Texte Tissu",
  "87": "Logo Blackpink 2",
  "88": "Effet Texte 3D",
  "89": "Effet Texte Magique",
  "90": "Texte Plage de Sable",
  "91": "Texte Glitch Néon",
  "92": "Effet Texte Tissu",
  "93": "Texte Message Café",
  "94": "Effet Texte Bijou",
  "95": "Effet Métal Chaud",
  "96": "Créateur Typographie 5",
  "97": "Effet Texte Bonbon",
  "98": "Écriture Chauve-Souris Galaxie",
  "99": "Effet Feu d'Artifice",
  "100": "Texte Graffiti en Ligne"
};

module.exports = {
  config: {
    name: "ephoto",
    version: "1.0",
    author: "Christus",
    countDown: 5,
    role: 0,
    shortDescription: "Créer un effet texte Ephoto stylé ou voir la liste des modèles",
    longDescription: "Générer un effet Ephoto avec texte et ID (1–100) ou afficher la liste de tous les modèles disponibles",
    category: "image",
    guide: {
      fr: "{pn} <texte> - <id>\nExemple: {pn} Christus - 27\n\nVoir la liste:\n{pn} list"
    }
  },

  onStart: async function ({ event, message, args, api }) {
    const prefix =
      global.utils && typeof global.utils.getPrefix === "function"
        ? await global.utils.getPrefix(event.threadID)
        : "/";

    const input = args.join(" ").trim();

    if (input.toLowerCase() === "list") {
      let msg = "🎨 𝐌𝐎𝐃È𝐋𝐄𝐒 𝐄𝐏𝐇𝐎𝐓𝐎 (1–100)\n\n";
      for (const i in availableTEMPLATES) {
        msg += `🆔 ${i.padStart(3, " ")} → ${availableTEMPLATES[i]}\n`;
      }
      msg += `\n💡 Utilisation:\n${prefix}ephoto <texte> - <id>\nExemple: ${prefix}ephoto Christus - 27`;
      return message.reply(msg);
    }

    const parts = input.split("-");
    const text = parts[0]?.trim();
    const id = parseInt(parts[1]?.trim());

    if (!text || !id) {
      return message.reply(`⚠️ Utilisation: ${prefix}ephoto <texte> - <id>\nExemple: ${prefix}ephoto Christus - 27`);
    }

    if (isNaN(id) || id < 1 || id > 100) {
      return message.reply(
        `❌ ID invalide ! Veuillez utiliser un ID entre 1 et 100.\nUtilisez '${prefix}ephoto list' pour voir tous les modèles disponibles.`
      );
    }

    const loadingMsg = await message.reply(`🎨 Génération de l'effet Ephoto pour “${text}” (ID: ${id})...`);

    try {
      const githubRawUrl = "https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json";
      const apiRes = await axios.get(githubRawUrl);
      const baseUrl = apiRes.data.apiv1;
      const res = await axios.get(`${baseUrl}/api/ephoto?id=${id}&text=${encodeURIComponent(text)}`);

      if (!res.data?.status || !res.data.result_url) {
        await api.unsendMessage(loadingMsg.messageID);
        return message.reply("❌ Oups ! Une erreur est survenue. Veuillez réessayer plus tard.");
      }

      await api.unsendMessage(loadingMsg.messageID);
      return message.reply({
        body: `✅ Effet 𝐄𝐩𝐡𝐨𝐭𝐨 généré !\n\n🆔 ID: ${id} (${availableTEMPLATES[id]})\n🔤 Texte: ${text}`,
        attachment: await global.utils.getStreamFromURL(res.data.result_url)
      });
    } catch (e) {
      await api.unsendMessage(loadingMsg.messageID);
      return message.reply("❌ Oups ! Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  }
};
