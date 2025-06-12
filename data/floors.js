const floors = [
  {
    "id": 1,
    "name": "Piętro 1 - Warsztat",
    "boss": {
      "name": "Zepsuty Robot",
      "hp": 50,
      "reward": 25
    }
  },
  {
    "id": 2,
    "name": "Piętro 2 - Magazyn",
    "boss": {
      "name": "Stary Automat",
      "hp": 80,
      "reward": 50
    }
  },
  {
    "id": 3,
    "name": "Piętro 3 - Biuro",
    "boss": {
      "name": "Komputer Biurowy",
      "hp": 120,
      "reward": 75
    }
  },
  {
    "id": 4,
    "name": "Piętro 4 - Laboratorium",
    "boss": {
      "name": "Eksperymentalny Droid",
      "hp": 200,
      "reward": 150
    }
  },
  {
    "id": 5,
    "name": "Piętro 5 - Hala Produkcyjna",
    "boss": {
      "name": "Mega Destruktor",
      "hp": 500,
      "reward": 300
    },
    "unlocksMachine": "automat"
  },
  {
    "id": 6,
    "name": "Piętro 6 - Serwerownia",
    "boss": {
      "name": "Główny Serwer",
      "hp": 700,
      "reward": 400
    }
  },
  {
    "id": 7,
    "name": "Piętro 7 - Jednostka Bezpieczeństwa",
    "boss": {
      "name": "Strażnik Cyber",
      "hp": 1000,
      "reward": 600
    }
  },
  {
    "id": 8,
    "name": "Piętro 8 - Centrum Logistyczne",
    "boss": {
      "name": "Mega Transporter",
      "hp": 1400,
      "reward": 850
    }
  },
  {
    "id": 9,
    "name": "Piętro 9 - Hala Testowa",
    "boss": {
      "name": "Prototyp Alpha",
      "hp": 1800,
      "reward": 1100
    }
  },
  {
    "id": 10,
    "name": "Piętro 10 - Centrum Kontroli",
    "boss": {
      "name": "AI Guardian",
      "hp": 2000,
      "reward": 1500
    },
    "unlocksMachine": "fabryka"
  },
  {
    "id": 11,
    "name": "Piętro 11 - Reaktor Energetyczny",
    "boss": {
      "name": "Rdzeń Energii",
      "hp": 3000,
      "reward": 2000
    }
  },
  {
    "id": 12,
    "name": "Piętro 12 - Sala Konferencyjna",
    "boss": {
      "name": "Hologram CEO",
      "hp": 4200,
      "reward": 2800
    }
  },
  {
    "id": 13,
    "name": "Piętro 13 - Podziemne Tunele",
    "boss": {
      "name": "Kopacz Tuneli",
      "hp": 5800,
      "reward": 3800
    }
  },
  {
    "id": 14,
    "name": "Piętro 14 - Fabryka Robotów",
    "boss": {
      "name": "Główny Montażysta",
      "hp": 7500,
      "reward": 5000
    }
  },
  {
    "id": 15,
    "name": "Piętro 15 - Stacja Kosmiczna",
    "boss": {
      "name": "Satelita Obronny",
      "hp": 10000,
      "reward": 6800
    },
    "unlocksMachine": "mega_automat"
  },
  {
    "id": 16,
    "name": "Piętro 16 - Baza Wojskowa",
    "boss": {
      "name": "General Mech",
      "hp": 13500,
      "reward": 9000
    }
  },
  {
    "id": 17,
    "name": "Piętro 17 - Centrum Badawcze",
    "boss": {
      "name": "Super Komputer",
      "hp": 17000,
      "reward": 11500
    }
  },
  {
    "id": 18,
    "name": "Piętro 18 - Platforma Wiertnicza",
    "boss": {
      "name": "Wiertło Titanowe",
      "hp": 22000,
      "reward": 15000
    }
  },
  {
    "id": 19,
    "name": "Piętro 19 - Hala Kryształów",
    "boss": {
      "name": "Kryształowy Golem",
      "hp": 28000,
      "reward": 19000
    }
  },
  {
    "id": 20,
    "name": "Piętro 20 - Główna Baza",
    "boss": {
      "name": "Mechatron Prime",
      "hp": 35000,
      "reward": 25000
    },
    "unlocksMachine": "ultra_fabryka"
  },
  {
    "id": 21,
    "name": "Piętro 21 - Portal Wymiarowy",
    "boss": {
      "name": "Strażnik Portalu",
      "hp": 45000,
      "reward": 32000
    }
  },
  {
    "id": 22,
    "name": "Piętro 22 - Miasto Androidów",
    "boss": {
      "name": "Burmistrz Android",
      "hp": 57000,
      "reward": 40000
    }
  },
  {
    "id": 23,
    "name": "Piętro 23 - Kopalnia Diamentów",
    "boss": {
      "name": "Diamentowy Krab",
      "hp": 72000,
      "reward": 50000
    }
  },
  {
    "id": 24,
    "name": "Piętro 24 - Stacja Meteorologiczna",
    "boss": {
      "name": "Władca Burz",
      "hp": 90000,
      "reward": 62000
    }
  },
  {
    "id": 25,
    "name": "Piętro 25 - Centrum Klonowania",
    "boss": {
      "name": "Klon Alfa",
      "hp": 110000,
      "reward": 75000
    },
    "unlocksMachine": "quantum_generator"
  },
  {
    "id": 26,
    "name": "Piętro 26 - Biblioteka Danych",
    "boss": {
      "name": "Archiwista AI",
      "hp": 135000,
      "reward": 92000
    }
  },
  {
    "id": 27,
    "name": "Piętro 27 - Arena Gladiatorów",
    "boss": {
      "name": "Mistrz Areny",
      "hp": 165000,
      "reward": 110000
    }
  },
  {
    "id": 28,
    "name": "Piętro 28 - Centrum Teleportacji",
    "boss": {
      "name": "Władca Przestrzeni",
      "hp": 200000,
      "reward": 135000
    }
  },
  {
    "id": 29,
    "name": "Piętro 29 - Fabryka Czasów",
    "boss": {
      "name": "Strażnik Czasu",
      "hp": 240000,
      "reward": 160000
    }
  },
  {
    "id": 30,
    "name": "Piętro 30 - Tron Maszynowy",
    "boss": {
      "name": "Król Maszyn",
      "hp": 290000,
      "reward": 200000
    },
    "unlocksMachine": "infinity_core"
  },
  {
    "id": 31,
    "name": "Piętro 31 - Cytadela Nano",
    "boss": {
      "name": "Nano Swarm",
      "hp": 350000,
      "reward": 240000
    }
  },
  {
    "id": 32,
    "name": "Piętro 32 - Obserwatorium",
    "boss": {
      "name": "Oko Wszechświata",
      "hp": 420000,
      "reward": 285000
    }
  },
  {
    "id": 33,
    "name": "Piętro 33 - Wielki Akcelerator",
    "boss": {
      "name": "Hadron Destroyer",
      "hp": 500000,
      "reward": 340000
    }
  },
  {
    "id": 34,
    "name": "Piętro 34 - Matryca Główna",
    "boss": {
      "name": "Matrix Core",
      "hp": 590000,
      "reward": 400000
    }
  },
  {
    "id": 35,
    "name": "Piętro 35 - Wrota Galaktyk",
    "boss": {
      "name": "Galactic Gate",
      "hp": 700000,
      "reward": 480000
    },
    "unlocksMachine": "cosmic_factory"
  },
  {
    "id": 36,
    "name": "Piętro 36 - Płonąca Planeta",
    "boss": {
      "name": "Władca Magmy",
      "hp": 820000,
      "reward": 570000
    }
  },
  {
    "id": 37,
    "name": "Piętro 37 - Lodowa Forteca",
    "boss": {
      "name": "Lodowy Tytan",
      "hp": 960000,
      "reward": 670000
    }
  },
  {
    "id": 38,
    "name": "Piętro 38 - Burzowa Cytadela",
    "boss": {
      "name": "Piorunowy Lewiatan",
      "hp": 1120000,
      "reward": 780000
    }
  },
  {
    "id": 39,
    "name": "Piętro 39 - Mroczny Las",
    "boss": {
      "name": "Cień Wieczności",
      "hp": 1300000,
      "reward": 920000
    }
  },
  {
    "id": 40,
    "name": "Piętro 40 - Złoty Pałac",
    "boss": {
      "name": "Złoty Imperator",
      "hp": 1500000,
      "reward": 1080000
    },
    "unlocksMachine": "divine_engine"
  },
  {
    "id": 41,
    "name": "Piętro 41 - Asteroidalna Kopalnia",
    "boss": {
      "name": "Górniczy Koloss",
      "hp": 1750000,
      "reward": 1250000
    }
  },
  {
    "id": 42,
    "name": "Piętro 42 - Nebuła Tajemnic",
    "boss": {
      "name": "Kosmiczny Enigma",
      "hp": 2000000,
      "reward": 1450000
    }
  },
  {
    "id": 43,
    "name": "Piętro 43 - Czarna Dziura",
    "boss": {
      "name": "Władca Grawitacji",
      "hp": 2300000,
      "reward": 1680000
    }
  },
  {
    "id": 44,
    "name": "Piętro 44 - Kwantowa Rzeczywistość",
    "boss": {
      "name": "Quantum Overlord",
      "hp": 2650000,
      "reward": 1950000
    }
  },
  {
    "id": 45,
    "name": "Piętro 45 - Multiwymiar",
    "boss": {
      "name": "Multiwymiarowy Archanioł",
      "hp": 3050000,
      "reward": 2250000
    },
    "unlocksMachine": "reality_forge"
  },
  {
    "id": 46,
    "name": "Piętro 46 - Końcowa Symulacja",
    "boss": {
      "name": "Symulator Bogów",
      "hp": 3500000,
      "reward": 2600000
    }
  },
  {
    "id": 47,
    "name": "Piętro 47 - Absolutna Pustka",
    "boss": {
      "name": "Nicość Pierwotna",
      "hp": 4000000,
      "reward": 3000000
    }
  },
  {
    "id": 48,
    "name": "Piętro 48 - Centrum Wszechświata",
    "boss": {
      "name": "Serce Kosmosu",
      "hp": 4600000,
      "reward": 3500000
    }
  },
  {
    "id": 49,
    "name": "Piętro 49 - Brama Nieskończoności",
    "boss": {
      "name": "Strażnik Wieczności",
      "hp": 5300000,
      "reward": 4000000
    }
  },
  {
    "id": 50,
    "name": "Piętro 50 - Tron Stwórcy",
    "boss": {
      "name": "Ostateczny Stwórca",
      "hp": 6000000,
      "reward": 5000000
    },
    "unlocksMachine": "creator_matrix"
  },
  {
    "id": 51,
    "name": "Piętro 51 - Tardis",
    "boss": {
      "name": "Doktor Who",
      "hp": 7000000,
      "reward": 6000000
    },
    "unlocksMachine": "time_machine"
  }
];