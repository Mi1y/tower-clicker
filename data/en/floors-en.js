const floors = [
  {
    "id": 1,
    "name": "Floor 1 - Workshop",
    "boss": {
      "name": "Broken Robot",
      "hp": 50,
      "reward": 25
    }
  },
  {
    "id": 2,
    "name": "Floor 2 - Warehouse",
    "boss": {
      "name": "Old Automat",
      "hp": 80,
      "reward": 50
    }
  },
  {
    "id": 3,
    "name": "Floor 3 - Office",
    "boss": {
      "name": "Office Computer",
      "hp": 120,
      "reward": 75
    }
  },
  {
    "id": 4,
    "name": "Floor 4 - Laboratory",
    "boss": {
      "name": "Experimental Droid",
      "hp": 200,
      "reward": 150
    }
  },
  {
    "id": 5,
    "name": "Floor 5 - Production Hall",
    "boss": {
      "name": "Mega Destructor",
      "hp": 500,
      "reward": 300
    },
    "unlocksMachine": "automat"
  },
  {
    "id": 6,
    "name": "Floor 6 - Server Room",
    "boss": {
      "name": "Main Server",
      "hp": 700,
      "reward": 400
    }
  },
  {
    "id": 7,
    "name": "Floor 7 - Security Unit",
    "boss": {
      "name": "Cyber Guardian",
      "hp": 1000,
      "reward": 600
    }
  },
  {
    "id": 8,
    "name": "Floor 8 - Logistics Center",
    "boss": {
      "name": "Mega Transporter",
      "hp": 1400,
      "reward": 850
    }
  },
  {
    "id": 9,
    "name": "Floor 9 - Test Hall",
    "boss": {
      "name": "Alpha Prototype",
      "hp": 1800,
      "reward": 1100
    }
  },
  {
    "id": 10,
    "name": "Floor 10 - Control Center",
    "boss": {
      "name": "AI Guardian",
      "hp": 2000,
      "reward": 1500
    },
    "unlocksMachine": "factory"
  },
  {
    "id": 11,
    "name": "Floor 11 - Energy Reactor",
    "boss": {
      "name": "Energy Core",
      "hp": 3000,
      "reward": 2000
    }
  },
  {
    "id": 12,
    "name": "Floor 12 - Conference Room",
    "boss": {
      "name": "CEO Hologram",
      "hp": 4200,
      "reward": 2800
    }
  },
  {
    "id": 13,
    "name": "Floor 13 - Underground Tunnels",
    "boss": {
      "name": "Tunnel Digger",
      "hp": 5800,
      "reward": 3800
    }
  },
  {
    "id": 14,
    "name": "Floor 14 - Robot Factory",
    "boss": {
      "name": "Chief Assembler",
      "hp": 7500,
      "reward": 5000
    }
  },
  {
    "id": 15,
    "name": "Floor 15 - Space Station",
    "boss": {
      "name": "Defense Satellite",
      "hp": 10000,
      "reward": 6800
    },
    "unlocksMachine": "mega_automat"
  },
  {
    "id": 16,
    "name": "Floor 16 - Military Base",
    "boss": {
      "name": "General Mech",
      "hp": 13500,
      "reward": 9000
    }
  },
  {
    "id": 17,
    "name": "Floor 17 - Research Center",
    "boss": {
      "name": "Super Computer",
      "hp": 17000,
      "reward": 11500
    }
  },
  {
    "id": 18,
    "name": "Floor 18 - Drilling Platform",
    "boss": {
      "name": "Titanium Drill",
      "hp": 22000,
      "reward": 15000
    }
  },
  {
    "id": 19,
    "name": "Floor 19 - Crystal Hall",
    "boss": {
      "name": "Crystal Golem",
      "hp": 28000,
      "reward": 19000
    }
  },
  {
    "id": 20,
    "name": "Floor 20 - Main Base",
    "boss": {
      "name": "Mechatron Prime",
      "hp": 35000,
      "reward": 25000
    },
    "unlocksMachine": "ultra_factory"
  },
  {
    "id": 21,
    "name": "Floor 21 - Dimensional Portal",
    "boss": {
      "name": "Portal Guardian",
      "hp": 45000,
      "reward": 32000
    }
  },
  {
    "id": 22,
    "name": "Floor 22 - Android City",
    "boss": {
      "name": "Android Mayor",
      "hp": 57000,
      "reward": 40000
    }
  },
  {
    "id": 23,
    "name": "Floor 23 - Diamond Mine",
    "boss": {
      "name": "Diamond Crab",
      "hp": 72000,
      "reward": 50000
    }
  },
  {
    "id": 24,
    "name": "Floor 24 - Weather Station",
    "boss": {
      "name": "Storm Lord",
      "hp": 90000,
      "reward": 62000
    }
  },
  {
    "id": 25,
    "name": "Floor 25 - Cloning Center",
    "boss": {
      "name": "Alpha Clone",
      "hp": 110000,
      "reward": 75000
    },
    "unlocksMachine": "quantum_generator"
  },
  {
    "id": 26,
    "name": "Floor 26 - Data Library",
    "boss": {
      "name": "AI Archivist",
      "hp": 135000,
      "reward": 92000
    }
  },
  {
    "id": 27,
    "name": "Floor 27 - Gladiator Arena",
    "boss": {
      "name": "Arena Master",
      "hp": 165000,
      "reward": 110000
    }
  },
  {
    "id": 28,
    "name": "Floor 28 - Teleportation Center",
    "boss": {
      "name": "Space Lord",
      "hp": 200000,
      "reward": 135000
    }
  },
  {
    "id": 29,
    "name": "Floor 29 - Time Factory",
    "boss": {
      "name": "Time Guardian",
      "hp": 240000,
      "reward": 160000
    }
  },
  {
    "id": 30,
    "name": "Floor 30 - Machine Throne",
    "boss": {
      "name": "Machine King",
      "hp": 290000,
      "reward": 200000
    },
    "unlocksMachine": "infinity_core"
  },
  {
    "id": 31,
    "name": "Floor 31 - Nano Citadel",
    "boss": {
      "name": "Nano Swarm",
      "hp": 350000,
      "reward": 240000
    }
  },
  {
    "id": 32,
    "name": "Floor 32 - Observatory",
    "boss": {
      "name": "Eye of Universe",
      "hp": 420000,
      "reward": 285000
    }
  },
  {
    "id": 33,
    "name": "Floor 33 - Large Accelerator",
    "boss": {
      "name": "Hadron Destroyer",
      "hp": 500000,
      "reward": 340000
    }
  },
  {
    "id": 34,
    "name": "Floor 34 - Main Matrix",
    "boss": {
      "name": "Matrix Core",
      "hp": 590000,
      "reward": 400000
    }
  },
  {
    "id": 35,
    "name": "Floor 35 - Galaxy Gates",
    "boss": {
      "name": "Galactic Gate",
      "hp": 700000,
      "reward": 480000
    },
    "unlocksMachine": "cosmic_factory"
  },
  {
    "id": 36,
    "name": "Floor 36 - Burning Planet",
    "boss": {
      "name": "Magma Lord",
      "hp": 820000,
      "reward": 570000
    }
  },
  {
    "id": 37,
    "name": "Floor 37 - Ice Fortress",
    "boss": {
      "name": "Ice Titan",
      "hp": 960000,
      "reward": 670000
    }
  },
  {
    "id": 38,
    "name": "Floor 38 - Storm Citadel",
    "boss": {
      "name": "Lightning Leviathan",
      "hp": 1120000,
      "reward": 780000
    }
  },
  {
    "id": 39,
    "name": "Floor 39 - Dark Forest",
    "boss": {
      "name": "Shadow of Eternity",
      "hp": 1300000,
      "reward": 920000
    }
  },
  {
    "id": 40,
    "name": "Floor 40 - Golden Palace",
    "boss": {
      "name": "Golden Emperor",
      "hp": 1500000,
      "reward": 1080000
    },
    "unlocksMachine": "divine_engine"
  },
  {
    "id": 41,
    "name": "Floor 41 - Asteroid Mine",
    "boss": {
      "name": "Mining Colossus",
      "hp": 1750000,
      "reward": 1250000
    }
  },
  {
    "id": 42,
    "name": "Floor 42 - Nebula of Mysteries",
    "boss": {
      "name": "Cosmic Enigma",
      "hp": 2000000,
      "reward": 1450000
    }
  },
  {
    "id": 43,
    "name": "Floor 43 - Black Hole",
    "boss": {
      "name": "Gravity Lord",
      "hp": 2300000,
      "reward": 1680000
    }
  },
  {
    "id": 44,
    "name": "Floor 44 - Quantum Reality",
    "boss": {
      "name": "Quantum Overlord",
      "hp": 2650000,
      "reward": 1950000
    }
  },
  {
    "id": 45,
    "name": "Floor 45 - Multidimension",
    "boss": {
      "name": "Multidimensional Archangel",
      "hp": 3050000,
      "reward": 2250000
    },
    "unlocksMachine": "reality_forge"
  },
  {
    "id": 46,
    "name": "Floor 46 - Final Simulation",
    "boss": {
      "name": "God Simulator",
      "hp": 3500000,
      "reward": 2600000
    }
  },
  {
    "id": 47,
    "name": "Floor 47 - Absolute Void",
    "boss": {
      "name": "Primordial Nothing",
      "hp": 4000000,
      "reward": 3000000
    }
  },
  {
    "id": 48,
    "name": "Floor 48 - Universe Center",
    "boss": {
      "name": "Heart of Cosmos",
      "hp": 4600000,
      "reward": 3500000
    }
  },
  {
    "id": 49,
    "name": "Floor 49 - Infinity Gate",
    "boss": {
      "name": "Eternity Guardian",
      "hp": 5300000,
      "reward": 4000000
    }
  },
  {
    "id": 50,
    "name": "Floor 50 - Creator's Throne",
    "boss": {
      "name": "Ultimate Creator",
      "hp": 6000000,
      "reward": 5000000
    },
    "unlocksMachine": "creator_matrix"
  },
  {
    "id": 51,
    "name": "Floor 51 - Tardis",
    "boss": {
      "name": "Doctor Who",
      "hp": 7000000,
      "reward": 6000000
    },
    "unlocksMachine": "time_machine"
  },
    {
    "id": 52,
    "name": "Floor 52 - Gallifrey",
    "boss": {
      "name": "Time Lord",
      "hp": 8000000,
      "reward": 7000000
    }
  },
  {
    "id": 53,
    "name": "Floor 53 - Cybertron",
    "boss": {
      "name": "Optimus Prime",
      "hp": 9200000,
      "reward": 8000000
    }
  },
  {
    "id": 54,
    "name": "Floor 54 - Krypton",
    "boss": {
      "name": "General Zod",
      "hp": 10500000,
      "reward": 9200000
    }
  },
  {
    "id": 55,
    "name": "Floor 55 - Asgard",
    "boss": {
      "name": "Odin All-Father",
      "hp": 12000000,
      "reward": 10500000
    },
    "unlocksMachine": "god_machine"
  },
  {
    "id": 56,
    "name": "Floor 56 - Pandora",
    "boss": {
      "name": "Toruk Makto",
      "hp": 13800000,
      "reward": 12000000
    }
  },
  {
    "id": 57,
    "name": "Floor 57 - Hoth",
    "boss": {
      "name": "AT-AT Walker",
      "hp": 15800000,
      "reward": 13800000
    }
  },
  {
    "id": 58,
    "name": "Floor 58 - Tatooine",
    "boss": {
      "name": "Jabba the Hutt",
      "hp": 18100000,
      "reward": 15800000
    }
  },
  {
    "id": 59,
    "name": "Floor 59 - Coruscant",
    "boss": {
      "name": "Darth Vader",
      "hp": 20700000,
      "reward": 18100000
    }
  },
  {
    "id": 60,
    "name": "Floor 60 - Death Star",
    "boss": {
      "name": "Emperor Palpatine",
      "hp": 23700000,
      "reward": 20700000
    },
    "unlocksMachine": "death_star"
  },
  {
    "id": 61,
    "name": "Floor 61 - Mordor",
    "boss": {
      "name": "Sauron",
      "hp": 27200000,
      "reward": 23700000
    }
  },
  {
    "id": 62,
    "name": "Floor 62 - Erebor",
    "boss": {
      "name": "Smaug the Golden",
      "hp": 31200000,
      "reward": 27200000
    }
  },
  {
    "id": 63,
    "name": "Floor 63 - Rivendell",
    "boss": {
      "name": "Elrond Half-elven",
      "hp": 35800000,
      "reward": 31200000
    }
  },
  {
    "id": 64,
    "name": "Floor 64 - Lothlórien",
    "boss": {
      "name": "Galadriel",
      "hp": 41100000,
      "reward": 35800000
    }
  },
  {
    "id": 65,
    "name": "Floor 65 - Valinor",
    "boss": {
      "name": "Manwë King of Winds",
      "hp": 47200000,
      "reward": 41100000
    },
    "unlocksMachine": "valar_ring"
  },
  {
    "id": 66,
    "name": "Floor 66 - Atlantis",
    "boss": {
      "name": "Poseidon",
      "hp": 54200000,
      "reward": 47200000
    }
  },
  {
    "id": 67,
    "name": "Floor 67 - Olympus",
    "boss": {
      "name": "Zeus Thunderer",
      "hp": 62300000,
      "reward": 54200000
    }
  },
  {
    "id": 68,
    "name": "Floor 68 - Hades",
    "boss": {
      "name": "Lord of Underworld",
      "hp": 71600000,
      "reward": 62300000
    }
  },
  {
    "id": 69,
    "name": "Floor 69 - Valhalla",
    "boss": {
      "name": "Thor Hammer-wielder",
      "hp": 82300000,
      "reward": 71600000
    }
  },
  {
    "id": 70,
    "name": "Floor 70 - Ragnarök",
    "boss": {
      "name": "Fenrir Wolf",
      "hp": 94600000,
      "reward": 82300000
    },
    "unlocksMachine": "ragnarok_engine"
  },
  {
    "id": 71,
    "name": "Floor 71 - Nirvana",
    "boss": {
      "name": "Buddha Enlightened",
      "hp": 108800000,
      "reward": 94600000
    }
  },
  {
    "id": 72,
    "name": "Floor 72 - Shambhala",
    "boss": {
      "name": "Dalai Lama",
      "hp": 125100000,
      "reward": 108800000
    }
  },
  {
    "id": 73,
    "name": "Floor 73 - Eden",
    "boss": {
      "name": "Archangel Gabriel",
      "hp": 143900000,
      "reward": 125100000
    }
  },
  {
    "id": 74,
    "name": "Floor 74 - Heaven",
    "boss": {
      "name": "Archangel Michael",
      "hp": 165500000,
      "reward": 143900000
    }
  },
  {
    "id": 75,
    "name": "Floor 75 - Seventh Heaven",
    "boss": {
      "name": "Burning Seraph",
      "hp": 190300000,
      "reward": 165500000
    },
    "unlocksMachine": "seraph_core"
  },
  {
    "id": 76,
    "name": "Floor 76 - Limbo",
    "boss": {
      "name": "Limbo Guardian",
      "hp": 218900000,
      "reward": 190300000
    }
  },
  {
    "id": 77,
    "name": "Floor 77 - Purgatory",
    "boss": {
      "name": "Dante Alighieri",
      "hp": 251700000,
      "reward": 218900000
    }
  },
  {
    "id": 78,
    "name": "Floor 78 - Inferno",
    "boss": {
      "name": "Lucifer Fallen",
      "hp": 289500000,
      "reward": 251700000
    }
  },
  {
    "id": 79,
    "name": "Floor 79 - Abaddon",
    "boss": {
      "name": "Angel of Destruction",
      "hp": 332900000,
      "reward": 289500000
    }
  },
  {
    "id": 80,
    "name": "Floor 80 - Gehenna",
    "boss": {
      "name": "Beelzebub Lord of Flies",
      "hp": 382800000,
      "reward": 332900000
    },
    "unlocksMachine": "hell_forge"
  },
  {
    "id": 81,
    "name": "Floor 81 - Hyperborea",
    "boss": {
      "name": "Apollo Solar",
      "hp": 440200000,
      "reward": 382800000
    }
  },
  {
    "id": 82,
    "name": "Floor 82 - Lemuria",
    "boss": {
      "name": "King Lemur",
      "hp": 506300000,
      "reward": 440200000
    }
  },
  {
    "id": 83,
    "name": "Floor 83 - Mu",
    "boss": {
      "name": "Emperor Mu",
      "hp": 582200000,
      "reward": 506300000
    }
  },
  {
    "id": 84,
    "name": "Floor 84 - Akasha",
    "boss": {
      "name": "Akashic Records",
      "hp": 669500000,
      "reward": 582200000
    }
  },
  {
    "id": 85,
    "name": "Floor 85 - Astral",
    "boss": {
      "name": "Lord of Astral",
      "hp": 769900000,
      "reward": 669500000
    },
    "unlocksMachine": "astral_projector"
  },
  {
    "id": 86,
    "name": "Floor 86 - Ether",
    "boss": {
      "name": "Spirit of Ether",
      "hp": 885400000,
      "reward": 769900000
    }
  },
  {
    "id": 87,
    "name": "Floor 87 - Akasa",
    "boss": {
      "name": "Fifth Element",
      "hp": 1018200000,
      "reward": 885400000
    }
  },
  {
    "id": 88,
    "name": "Floor 88 - Source",
    "boss": {
      "name": "Primordial Source",
      "hp": 1170900000,
      "reward": 1018200000
    }
  },
  {
    "id": 89,
    "name": "Floor 89 - Absolute",
    "boss": {
      "name": "Pure Absolute",
      "hp": 1346500000,
      "reward": 1170900000
    }
  },
  {
    "id": 90,
    "name": "Floor 90 - Unity",
    "boss": {
      "name": "First Cause",
      "hp": 1548500000,
      "reward": 1346500000
    },
    "unlocksMachine": "unity_core"
  },
  {
    "id": 91,
    "name": "Floor 91 - Infinity Plus",
    "boss": {
      "name": "Omega Infinity",
      "hp": 1780800000,
      "reward": 1548500000
    }
  },
  {
    "id": 92,
    "name": "Floor 92 - Meta-Reality",
    "boss": {
      "name": "Meta-God",
      "hp": 2048000000,
      "reward": 1780800000
    }
  },
  {
    "id": 93,
    "name": "Floor 93 - Super-Position",
    "boss": {
      "name": "Schrödinger's Cat",
      "hp": 2355200000,
      "reward": 2048000000
    }
  },
  {
    "id": 94,
    "name": "Floor 94 - Para-Universe",
    "boss": {
      "name": "Para-Creator",
      "hp": 2708480000,
      "reward": 2355200000
    }
  },
  {
    "id": 95,
    "name": "Floor 95 - Ultra-Existence",
    "boss": {
      "name": "Ultra-Being",
      "hp": 3114752000,
      "reward": 2708480000
    },
    "unlocksMachine": "existence_engine"
  },
  {
    "id": 96,
    "name": "Floor 96 - Hyper-Being",
    "boss": {
      "name": "Hyper-Entity",
      "hp": 3581964800,
      "reward": 3114752000
    }
  },
  {
    "id": 97,
    "name": "Floor 97 - Mega-Logos",
    "boss": {
      "name": "Primordial Logos",
      "hp": 4119259520,
      "reward": 3581964800
    }
  },
  {
    "id": 98,
    "name": "Floor 98 - Giga-Sophia",
    "boss": {
      "name": "Absolute Wisdom",
      "hp": 4737148448,
      "reward": 4119259520
    }
  },
  {
    "id": 99,
    "name": "Floor 99 - Tera-Gnosis",
    "boss": {
      "name": "Ultimate Knowledge",
      "hp": 5447720715,
      "reward": 4737148448
    }
  },
  {
    "id": 100,
    "name": "Floor 100 - ∞∞∞ THE END ∞∞∞",
    "boss": {
      "name": "⭐ TRUE CREATOR ⭐",
      "hp": 6264878822,
      "reward": 10000000000
    },
    "unlocksMachine": "omnipotence"
  }
];
