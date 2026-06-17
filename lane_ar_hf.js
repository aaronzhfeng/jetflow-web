window.PTD_DEMO_LANES = window.PTD_DEMO_LANES || [];
window.PTD_DEMO_LANES.push({
  "schema": "ptd-demo-trace/v0",
  "lane": {
    "method": "AR",
    "engine": "hf-transformers-synthetic",
    "model": "Qwen/Qwen3-8B",
    "device": "SYNTHETIC",
    "dataset": "math500",
    "recorded": "synthetic",
    "timing_source": "synthetic",
    "run_config": {
      "note": "SYNTHETIC: timing simulated from a target TPS to approximate the visual; answer text + tree structure borrowed from recorded fixtures; not a measurement. Real run tape is a drop-in replacement (same schema).",
      "target_tps": 95.0
    }
  },
  "prompt": {
    "id": "math500[1]",
    "text": "<|im_start|>user\nIn a certain isosceles right triangle, the altitude to the hypotenuse has length $4\\sqrt{2}$.  What is the area of the triangle?\nPlease reason step by step, and put your final answer within \\boxed{}.<|im_end|>\n<|im_start|>assistant\n<think>\n\n</think>\n\n",
    "chat_template": "qwen3 enable_thinking=False (mirrors fork bench)"
  },
  "events": [
    {
      "idx": 0,
      "t_ms": 0.0,
      "dur_ms": 189.223604,
      "text": "We",
      "token_texts": [
        "We"
      ]
    },
    {
      "idx": 1,
      "t_ms": 189.223604,
      "dur_ms": 45.496893,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 2,
      "t_ms": 234.720497,
      "dur_ms": 9.884683,
      "text": " given",
      "token_texts": [
        " given"
      ]
    },
    {
      "idx": 3,
      "t_ms": 244.60518,
      "dur_ms": 9.701004,
      "text": " that",
      "token_texts": [
        " that"
      ]
    },
    {
      "idx": 4,
      "t_ms": 254.306184,
      "dur_ms": 9.693187,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 5,
      "t_ms": 263.999371,
      "dur_ms": 9.665855,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 6,
      "t_ms": 273.665226,
      "dur_ms": 9.62054,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 7,
      "t_ms": 283.285766,
      "dur_ms": 9.559603,
      "text": " an",
      "token_texts": [
        " an"
      ]
    },
    {
      "idx": 8,
      "t_ms": 292.845369,
      "dur_ms": 9.517731,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 9,
      "t_ms": 302.3631,
      "dur_ms": 9.528639,
      "text": "isos",
      "token_texts": [
        "isos"
      ]
    },
    {
      "idx": 10,
      "t_ms": 311.891739,
      "dur_ms": 9.651637,
      "text": "ce",
      "token_texts": [
        "ce"
      ]
    },
    {
      "idx": 11,
      "t_ms": 321.543376,
      "dur_ms": 9.463259,
      "text": "les",
      "token_texts": [
        "les"
      ]
    },
    {
      "idx": 12,
      "t_ms": 331.006635,
      "dur_ms": 9.540013,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 13,
      "t_ms": 340.546648,
      "dur_ms": 9.492247,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 14,
      "t_ms": 350.038895,
      "dur_ms": 9.566281,
      "text": "**,",
      "token_texts": [
        "**,"
      ]
    },
    {
      "idx": 15,
      "t_ms": 359.605176,
      "dur_ms": 9.521798,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 16,
      "t_ms": 369.126974,
      "dur_ms": 9.52455,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 17,
      "t_ms": 378.651524,
      "dur_ms": 9.414769,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 18,
      "t_ms": 388.066293,
      "dur_ms": 9.435376,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 19,
      "t_ms": 397.501669,
      "dur_ms": 9.488496,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 20,
      "t_ms": 406.990165,
      "dur_ms": 9.420839,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 21,
      "t_ms": 416.411004,
      "dur_ms": 9.397464,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 22,
      "t_ms": 425.808468,
      "dur_ms": 9.839942,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 23,
      "t_ms": 435.64841,
      "dur_ms": 9.5176,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 24,
      "t_ms": 445.16601,
      "dur_ms": 9.542364,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 25,
      "t_ms": 454.708374,
      "dur_ms": 9.568298,
      "text": " has",
      "token_texts": [
        " has"
      ]
    },
    {
      "idx": 26,
      "t_ms": 464.276672,
      "dur_ms": 9.603334,
      "text": " length",
      "token_texts": [
        " length"
      ]
    },
    {
      "idx": 27,
      "t_ms": 473.880006,
      "dur_ms": 9.553832,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 28,
      "t_ms": 483.433838,
      "dur_ms": 9.569071,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 29,
      "t_ms": 493.002909,
      "dur_ms": 9.476669,
      "text": "4",
      "token_texts": [
        "4"
      ]
    },
    {
      "idx": 30,
      "t_ms": 502.479578,
      "dur_ms": 9.734505,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 31,
      "t_ms": 512.214083,
      "dur_ms": 9.584344,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 32,
      "t_ms": 521.798427,
      "dur_ms": 9.565624,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 33,
      "t_ms": 531.364051,
      "dur_ms": 9.592337,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 34,
      "t_ms": 540.956388,
      "dur_ms": 11.139037,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 35,
      "t_ms": 552.095425,
      "dur_ms": 9.810045,
      "text": " $.",
      "token_texts": [
        " $."
      ]
    },
    {
      "idx": 36,
      "t_ms": 561.90547,
      "dur_ms": 9.526249,
      "text": " We",
      "token_texts": [
        " We"
      ]
    },
    {
      "idx": 37,
      "t_ms": 571.431719,
      "dur_ms": 9.513782,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 38,
      "t_ms": 580.945501,
      "dur_ms": 9.65416,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 39,
      "t_ms": 590.599661,
      "dur_ms": 9.612203,
      "text": " find",
      "token_texts": [
        " find"
      ]
    },
    {
      "idx": 40,
      "t_ms": 600.211864,
      "dur_ms": 9.762038,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 41,
      "t_ms": 609.973902,
      "dur_ms": 9.575674,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 42,
      "t_ms": 619.549576,
      "dur_ms": 9.433819,
      "text": "area",
      "token_texts": [
        "area"
      ]
    },
    {
      "idx": 43,
      "t_ms": 628.983395,
      "dur_ms": 9.554116,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 44,
      "t_ms": 638.537511,
      "dur_ms": 9.504982,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 45,
      "t_ms": 648.042493,
      "dur_ms": 9.617673,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 46,
      "t_ms": 657.660166,
      "dur_ms": 9.61752,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 47,
      "t_ms": 667.277686,
      "dur_ms": 9.558666,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 48,
      "t_ms": 676.836352,
      "dur_ms": 9.500118,
      "text": "---\n\n",
      "token_texts": [
        "---\n\n"
      ]
    },
    {
      "idx": 49,
      "t_ms": 686.33647,
      "dur_ms": 9.577406,
      "text": "###",
      "token_texts": [
        "###"
      ]
    },
    {
      "idx": 50,
      "t_ms": 695.913876,
      "dur_ms": 9.580297,
      "text": " Step",
      "token_texts": [
        " Step"
      ]
    },
    {
      "idx": 51,
      "t_ms": 705.494173,
      "dur_ms": 9.582169,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 52,
      "t_ms": 715.076342,
      "dur_ms": 9.663429,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 53,
      "t_ms": 724.739771,
      "dur_ms": 9.525289,
      "text": ":",
      "token_texts": [
        ":"
      ]
    },
    {
      "idx": 54,
      "t_ms": 734.26506,
      "dur_ms": 9.507079,
      "text": " Understand",
      "token_texts": [
        " Understand"
      ]
    },
    {
      "idx": 55,
      "t_ms": 743.772139,
      "dur_ms": 9.926288,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 56,
      "t_ms": 753.698427,
      "dur_ms": 9.697317,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 57,
      "t_ms": 763.395744,
      "dur_ms": 9.711858,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 58,
      "t_ms": 773.107602,
      "dur_ms": 9.704373,
      "text": "An",
      "token_texts": [
        "An"
      ]
    },
    {
      "idx": 59,
      "t_ms": 782.811975,
      "dur_ms": 9.668195,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 60,
      "t_ms": 792.48017,
      "dur_ms": 9.70834,
      "text": "isos",
      "token_texts": [
        "isos"
      ]
    },
    {
      "idx": 61,
      "t_ms": 802.18851,
      "dur_ms": 9.713141,
      "text": "ce",
      "token_texts": [
        "ce"
      ]
    },
    {
      "idx": 62,
      "t_ms": 811.901651,
      "dur_ms": 9.708864,
      "text": "les",
      "token_texts": [
        "les"
      ]
    },
    {
      "idx": 63,
      "t_ms": 821.610515,
      "dur_ms": 9.631524,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 64,
      "t_ms": 831.242039,
      "dur_ms": 9.708486,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 65,
      "t_ms": 840.950525,
      "dur_ms": 9.614481,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 66,
      "t_ms": 850.565006,
      "dur_ms": 12.706158,
      "text": " has",
      "token_texts": [
        " has"
      ]
    },
    {
      "idx": 67,
      "t_ms": 863.271164,
      "dur_ms": 9.639368,
      "text": ":\n",
      "token_texts": [
        ":\n"
      ]
    },
    {
      "idx": 68,
      "t_ms": 872.910532,
      "dur_ms": 9.608491,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 69,
      "t_ms": 882.519023,
      "dur_ms": 9.673408,
      "text": " Two",
      "token_texts": [
        " Two"
      ]
    },
    {
      "idx": 70,
      "t_ms": 892.192431,
      "dur_ms": 9.712921,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 71,
      "t_ms": 901.905352,
      "dur_ms": 9.688813,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 72,
      "t_ms": 911.594165,
      "dur_ms": 9.636292,
      "text": " equal",
      "token_texts": [
        " equal"
      ]
    },
    {
      "idx": 73,
      "t_ms": 921.230457,
      "dur_ms": 9.723586,
      "text": " length",
      "token_texts": [
        " length"
      ]
    },
    {
      "idx": 74,
      "t_ms": 930.954043,
      "dur_ms": 9.660737,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 75,
      "t_ms": 940.61478,
      "dur_ms": 9.720531,
      "text": " say",
      "token_texts": [
        " say"
      ]
    },
    {
      "idx": 76,
      "t_ms": 950.335311,
      "dur_ms": 9.643315,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 77,
      "t_ms": 959.978626,
      "dur_ms": 9.779356,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 78,
      "t_ms": 969.757982,
      "dur_ms": 9.679071,
      "text": " $\n",
      "token_texts": [
        " $\n"
      ]
    },
    {
      "idx": 79,
      "t_ms": 979.437053,
      "dur_ms": 9.678791,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 80,
      "t_ms": 989.115844,
      "dur_ms": 9.731803,
      "text": " A",
      "token_texts": [
        " A"
      ]
    },
    {
      "idx": 81,
      "t_ms": 998.847647,
      "dur_ms": 9.63376,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 82,
      "t_ms": 1008.481407,
      "dur_ms": 9.668875,
      "text": " angle",
      "token_texts": [
        " angle"
      ]
    },
    {
      "idx": 83,
      "t_ms": 1018.150282,
      "dur_ms": 9.641006,
      "text": " between",
      "token_texts": [
        " between"
      ]
    },
    {
      "idx": 84,
      "t_ms": 1027.791288,
      "dur_ms": 10.452357,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 85,
      "t_ms": 1038.243645,
      "dur_ms": 9.637706,
      "text": " two",
      "token_texts": [
        " two"
      ]
    },
    {
      "idx": 86,
      "t_ms": 1047.881351,
      "dur_ms": 9.639706,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 87,
      "t_ms": 1057.521057,
      "dur_ms": 9.604353,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 88,
      "t_ms": 1067.12541,
      "dur_ms": 9.602222,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 89,
      "t_ms": 1076.727632,
      "dur_ms": 9.600664,
      "text": " The",
      "token_texts": [
        " The"
      ]
    },
    {
      "idx": 90,
      "t_ms": 1086.328296,
      "dur_ms": 9.596199,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 91,
      "t_ms": 1095.924495,
      "dur_ms": 9.58521,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 92,
      "t_ms": 1105.509705,
      "dur_ms": 9.550311,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 93,
      "t_ms": 1115.060016,
      "dur_ms": 9.617346,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 94,
      "t_ms": 1124.677362,
      "dur_ms": 9.580832,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 95,
      "t_ms": 1134.258194,
      "dur_ms": 12.022827,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 96,
      "t_ms": 1146.281021,
      "dur_ms": 9.545408,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 97,
      "t_ms": 1155.826429,
      "dur_ms": 9.525916,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 98,
      "t_ms": 1165.352345,
      "dur_ms": 9.636941,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 99,
      "t_ms": 1174.989286,
      "dur_ms": 9.593012,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 100,
      "t_ms": 1184.582298,
      "dur_ms": 9.585085,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 101,
      "t_ms": 1194.167383,
      "dur_ms": 10.430109,
      "text": " $\n\n",
      "token_texts": [
        " $\n\n"
      ]
    },
    {
      "idx": 102,
      "t_ms": 1204.597492,
      "dur_ms": 9.750548,
      "text": "Let",
      "token_texts": [
        "Let"
      ]
    },
    {
      "idx": 103,
      "t_ms": 1214.34804,
      "dur_ms": 9.644121,
      "text": "’s",
      "token_texts": [
        "’s"
      ]
    },
    {
      "idx": 104,
      "t_ms": 1223.992161,
      "dur_ms": 9.589382,
      "text": " denote",
      "token_texts": [
        " denote"
      ]
    },
    {
      "idx": 105,
      "t_ms": 1233.581543,
      "dur_ms": 9.81806,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 106,
      "t_ms": 1243.399603,
      "dur_ms": 9.575561,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 107,
      "t_ms": 1252.975164,
      "dur_ms": 9.626649,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 108,
      "t_ms": 1262.601813,
      "dur_ms": 9.773676,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 109,
      "t_ms": 1272.375489,
      "dur_ms": 9.719492,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 110,
      "t_ms": 1282.094981,
      "dur_ms": 9.584301,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 111,
      "t_ms": 1291.679282,
      "dur_ms": 9.556127,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 112,
      "t_ms": 1301.235409,
      "dur_ms": 9.559702,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 113,
      "t_ms": 1310.795111,
      "dur_ms": 9.559332,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 114,
      "t_ms": 1320.354443,
      "dur_ms": 9.549202,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 115,
      "t_ms": 1329.903645,
      "dur_ms": 9.524768,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 116,
      "t_ms": 1339.428413,
      "dur_ms": 9.555102,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 117,
      "t_ms": 1348.983515,
      "dur_ms": 9.551608,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 118,
      "t_ms": 1358.535123,
      "dur_ms": 9.510133,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 119,
      "t_ms": 1368.045256,
      "dur_ms": 9.629333,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 120,
      "t_ms": 1377.674589,
      "dur_ms": 9.637483,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 121,
      "t_ms": 1387.312072,
      "dur_ms": 9.677182,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 122,
      "t_ms": 1396.989254,
      "dur_ms": 9.641552,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 123,
      "t_ms": 1406.630806,
      "dur_ms": 9.683043,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 124,
      "t_ms": 1416.313849,
      "dur_ms": 9.692693,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 125,
      "t_ms": 1426.006542,
      "dur_ms": 9.593771,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 126,
      "t_ms": 1435.600313,
      "dur_ms": 9.616366,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 127,
      "t_ms": 1445.216679,
      "dur_ms": 9.529089,
      "text": "---\n\n",
      "token_texts": [
        "---\n\n"
      ]
    },
    {
      "idx": 128,
      "t_ms": 1454.745768,
      "dur_ms": 9.517353,
      "text": "###",
      "token_texts": [
        "###"
      ]
    },
    {
      "idx": 129,
      "t_ms": 1464.263121,
      "dur_ms": 9.577671,
      "text": " Step",
      "token_texts": [
        " Step"
      ]
    },
    {
      "idx": 130,
      "t_ms": 1473.840792,
      "dur_ms": 9.584957,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 131,
      "t_ms": 1483.425749,
      "dur_ms": 9.596198,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 132,
      "t_ms": 1493.021947,
      "dur_ms": 9.604201,
      "text": ":",
      "token_texts": [
        ":"
      ]
    },
    {
      "idx": 133,
      "t_ms": 1502.626148,
      "dur_ms": 9.55026,
      "text": " Use",
      "token_texts": [
        " Use"
      ]
    },
    {
      "idx": 134,
      "t_ms": 1512.176408,
      "dur_ms": 9.574402,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 135,
      "t_ms": 1521.75081,
      "dur_ms": 9.636112,
      "text": " formula",
      "token_texts": [
        " formula"
      ]
    },
    {
      "idx": 136,
      "t_ms": 1531.386922,
      "dur_ms": 9.652417,
      "text": " for",
      "token_texts": [
        " for"
      ]
    },
    {
      "idx": 137,
      "t_ms": 1541.039339,
      "dur_ms": 9.73133,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 138,
      "t_ms": 1550.770669,
      "dur_ms": 9.622837,
      "text": " area",
      "token_texts": [
        " area"
      ]
    },
    {
      "idx": 139,
      "t_ms": 1560.393506,
      "dur_ms": 9.631813,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 140,
      "t_ms": 1570.025319,
      "dur_ms": 9.692814,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 141,
      "t_ms": 1579.718133,
      "dur_ms": 9.569047,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 142,
      "t_ms": 1589.28718,
      "dur_ms": 9.978582,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 143,
      "t_ms": 1599.265762,
      "dur_ms": 9.916072,
      "text": "The",
      "token_texts": [
        "The"
      ]
    },
    {
      "idx": 144,
      "t_ms": 1609.181834,
      "dur_ms": 9.496577,
      "text": " area",
      "token_texts": [
        " area"
      ]
    },
    {
      "idx": 145,
      "t_ms": 1618.678411,
      "dur_ms": 9.532451,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 146,
      "t_ms": 1628.210862,
      "dur_ms": 9.580603,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 147,
      "t_ms": 1637.791465,
      "dur_ms": 9.612248,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 148,
      "t_ms": 1647.403713,
      "dur_ms": 9.610383,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 149,
      "t_ms": 1657.014096,
      "dur_ms": 9.589946,
      "text": ":\n\n",
      "token_texts": [
        ":\n\n"
      ]
    },
    {
      "idx": 150,
      "t_ms": 1666.604042,
      "dur_ms": 9.559699,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 151,
      "t_ms": 1676.163741,
      "dur_ms": 9.623444,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 152,
      "t_ms": 1685.787185,
      "dur_ms": 9.531319,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 153,
      "t_ms": 1695.318504,
      "dur_ms": 9.560216,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 154,
      "t_ms": 1704.87872,
      "dur_ms": 9.557177,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 155,
      "t_ms": 1714.435897,
      "dur_ms": 9.551548,
      "text": "Area",
      "token_texts": [
        "Area"
      ]
    },
    {
      "idx": 156,
      "t_ms": 1723.987445,
      "dur_ms": 9.528775,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 157,
      "t_ms": 1733.51622,
      "dur_ms": 9.545001,
      "text": " =",
      "token_texts": [
        " ="
      ]
    },
    {
      "idx": 158,
      "t_ms": 1743.061221,
      "dur_ms": 9.57507,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 159,
      "t_ms": 1752.636291,
      "dur_ms": 9.523471,
      "text": "frac",
      "token_texts": [
        "frac"
      ]
    },
    {
      "idx": 160,
      "t_ms": 1762.159762,
      "dur_ms": 9.597476,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 161,
      "t_ms": 1771.757238,
      "dur_ms": 9.62139,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 162,
      "t_ms": 1781.378628,
      "dur_ms": 9.56014,
      "text": "}{",
      "token_texts": [
        "}{"
      ]
    },
    {
      "idx": 163,
      "t_ms": 1790.938768,
      "dur_ms": 9.687624,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 164,
      "t_ms": 1800.626392,
      "dur_ms": 9.622107,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 165,
      "t_ms": 1810.248499,
      "dur_ms": 9.612079,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 166,
      "t_ms": 1819.860578,
      "dur_ms": 9.583814,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 167,
      "t_ms": 1829.444392,
      "dur_ms": 9.734566,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 168,
      "t_ms": 1839.178958,
      "dur_ms": 9.70228,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 169,
      "t_ms": 1848.881238,
      "dur_ms": 10.406415,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 170,
      "t_ms": 1859.287653,
      "dur_ms": 9.723236,
      "text": "base",
      "token_texts": [
        "base"
      ]
    },
    {
      "idx": 171,
      "t_ms": 1869.010889,
      "dur_ms": 9.662484,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 172,
      "t_ms": 1878.673373,
      "dur_ms": 9.694646,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 173,
      "t_ms": 1888.368019,
      "dur_ms": 9.751701,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 174,
      "t_ms": 1898.11972,
      "dur_ms": 9.73438,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 175,
      "t_ms": 1907.8541,
      "dur_ms": 9.776509,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 176,
      "t_ms": 1917.630609,
      "dur_ms": 10.132696,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 177,
      "t_ms": 1927.763305,
      "dur_ms": 9.775315,
      "text": "height",
      "token_texts": [
        "height"
      ]
    },
    {
      "idx": 178,
      "t_ms": 1937.53862,
      "dur_ms": 9.813386,
      "text": "}\n",
      "token_texts": [
        "}\n"
      ]
    },
    {
      "idx": 179,
      "t_ms": 1947.352006,
      "dur_ms": 9.718406,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 180,
      "t_ms": 1957.070412,
      "dur_ms": 9.806505,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 181,
      "t_ms": 1966.876917,
      "dur_ms": 9.729428,
      "text": "In",
      "token_texts": [
        "In"
      ]
    },
    {
      "idx": 182,
      "t_ms": 1976.606345,
      "dur_ms": 9.76872,
      "text": " this",
      "token_texts": [
        " this"
      ]
    },
    {
      "idx": 183,
      "t_ms": 1986.375065,
      "dur_ms": 9.719794,
      "text": " case",
      "token_texts": [
        " case"
      ]
    },
    {
      "idx": 184,
      "t_ms": 1996.094859,
      "dur_ms": 9.701219,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 185,
      "t_ms": 2005.796078,
      "dur_ms": 9.700352,
      "text": " we",
      "token_texts": [
        " we"
      ]
    },
    {
      "idx": 186,
      "t_ms": 2015.49643,
      "dur_ms": 9.664285,
      "text": " can",
      "token_texts": [
        " can"
      ]
    },
    {
      "idx": 187,
      "t_ms": 2025.160715,
      "dur_ms": 9.710789,
      "text": " use",
      "token_texts": [
        " use"
      ]
    },
    {
      "idx": 188,
      "t_ms": 2034.871504,
      "dur_ms": 9.690086,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 189,
      "t_ms": 2044.56159,
      "dur_ms": 9.712063,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 190,
      "t_ms": 2054.273653,
      "dur_ms": 9.761152,
      "text": "hyp",
      "token_texts": [
        "hyp"
      ]
    },
    {
      "idx": 191,
      "t_ms": 2064.034805,
      "dur_ms": 9.5939,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 192,
      "t_ms": 2073.628705,
      "dur_ms": 9.590099,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 193,
      "t_ms": 2083.218804,
      "dur_ms": 9.568689,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 194,
      "t_ms": 2092.787493,
      "dur_ms": 15.383424,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 195,
      "t_ms": 2108.170917,
      "dur_ms": 9.599396,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 196,
      "t_ms": 2117.770313,
      "dur_ms": 9.576567,
      "text": " base",
      "token_texts": [
        " base"
      ]
    },
    {
      "idx": 197,
      "t_ms": 2127.34688,
      "dur_ms": 9.655245,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 198,
      "t_ms": 2137.002125,
      "dur_ms": 9.544064,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 199,
      "t_ms": 2146.546189,
      "dur_ms": 9.608519,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 200,
      "t_ms": 2156.154708,
      "dur_ms": 9.547083,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 201,
      "t_ms": 2165.701791,
      "dur_ms": 9.636886,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 202,
      "t_ms": 2175.338677,
      "dur_ms": 9.63847,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 203,
      "t_ms": 2184.977147,
      "dur_ms": 9.670461,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 204,
      "t_ms": 2194.647608,
      "dur_ms": 9.61765,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 205,
      "t_ms": 2204.265258,
      "dur_ms": 9.628397,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 206,
      "t_ms": 2213.893655,
      "dur_ms": 9.697318,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 207,
      "t_ms": 2223.590973,
      "dur_ms": 9.641434,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 208,
      "t_ms": 2233.232407,
      "dur_ms": 9.725066,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 209,
      "t_ms": 2242.957473,
      "dur_ms": 9.62517,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 210,
      "t_ms": 2252.582643,
      "dur_ms": 9.61324,
      "text": " height",
      "token_texts": [
        " height"
      ]
    },
    {
      "idx": 211,
      "t_ms": 2262.195883,
      "dur_ms": 9.592851,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 212,
      "t_ms": 2271.788734,
      "dur_ms": 9.626565,
      "text": "So",
      "token_texts": [
        "So"
      ]
    },
    {
      "idx": 213,
      "t_ms": 2281.415299,
      "dur_ms": 9.560228,
      "text": ":\n\n",
      "token_texts": [
        ":\n\n"
      ]
    },
    {
      "idx": 214,
      "t_ms": 2290.975527,
      "dur_ms": 9.624373,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 215,
      "t_ms": 2300.5999,
      "dur_ms": 9.578202,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 216,
      "t_ms": 2310.178102,
      "dur_ms": 9.570431,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 217,
      "t_ms": 2319.748533,
      "dur_ms": 9.581324,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 218,
      "t_ms": 2329.329857,
      "dur_ms": 9.546025,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 219,
      "t_ms": 2338.875882,
      "dur_ms": 9.512781,
      "text": "Area",
      "token_texts": [
        "Area"
      ]
    },
    {
      "idx": 220,
      "t_ms": 2348.388663,
      "dur_ms": 9.611051,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 221,
      "t_ms": 2357.999714,
      "dur_ms": 9.555764,
      "text": " =",
      "token_texts": [
        " ="
      ]
    },
    {
      "idx": 222,
      "t_ms": 2367.555478,
      "dur_ms": 9.630289,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 223,
      "t_ms": 2377.185767,
      "dur_ms": 9.572055,
      "text": "frac",
      "token_texts": [
        "frac"
      ]
    },
    {
      "idx": 224,
      "t_ms": 2386.757822,
      "dur_ms": 9.640192,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 225,
      "t_ms": 2396.398014,
      "dur_ms": 9.577703,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 226,
      "t_ms": 2405.975717,
      "dur_ms": 9.563653,
      "text": "}{",
      "token_texts": [
        "}{"
      ]
    },
    {
      "idx": 227,
      "t_ms": 2415.53937,
      "dur_ms": 9.594948,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 228,
      "t_ms": 2425.134318,
      "dur_ms": 9.611082,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 229,
      "t_ms": 2434.7454,
      "dur_ms": 9.569279,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 230,
      "t_ms": 2444.314679,
      "dur_ms": 9.54773,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 231,
      "t_ms": 2453.862409,
      "dur_ms": 9.593133,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 232,
      "t_ms": 2463.455542,
      "dur_ms": 9.527165,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 233,
      "t_ms": 2472.982707,
      "dur_ms": 9.545969,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 234,
      "t_ms": 2482.528676,
      "dur_ms": 9.510924,
      "text": "hyp",
      "token_texts": [
        "hyp"
      ]
    },
    {
      "idx": 235,
      "t_ms": 2492.0396,
      "dur_ms": 9.68241,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 236,
      "t_ms": 2501.72201,
      "dur_ms": 10.376444,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 237,
      "t_ms": 2512.098454,
      "dur_ms": 9.85031,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 238,
      "t_ms": 2521.948764,
      "dur_ms": 9.634838,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 239,
      "t_ms": 2531.583602,
      "dur_ms": 9.63413,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 240,
      "t_ms": 2541.217732,
      "dur_ms": 9.683187,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 241,
      "t_ms": 2550.900919,
      "dur_ms": 9.598545,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 242,
      "t_ms": 2560.499464,
      "dur_ms": 9.575253,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 243,
      "t_ms": 2570.074717,
      "dur_ms": 9.640259,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 244,
      "t_ms": 2579.714976,
      "dur_ms": 9.528812,
      "text": "}\n",
      "token_texts": [
        "}\n"
      ]
    },
    {
      "idx": 245,
      "t_ms": 2589.243788,
      "dur_ms": 9.588554,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 246,
      "t_ms": 2598.832342,
      "dur_ms": 9.601736,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 247,
      "t_ms": 2608.434078,
      "dur_ms": 9.591053,
      "text": "We",
      "token_texts": [
        "We"
      ]
    },
    {
      "idx": 248,
      "t_ms": 2618.025131,
      "dur_ms": 9.635052,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 249,
      "t_ms": 2627.660183,
      "dur_ms": 9.624862,
      "text": " given",
      "token_texts": [
        " given"
      ]
    },
    {
      "idx": 250,
      "t_ms": 2637.285045,
      "dur_ms": 9.563976,
      "text": ":\n",
      "token_texts": [
        ":\n"
      ]
    },
    {
      "idx": 251,
      "t_ms": 2646.849021,
      "dur_ms": 9.581548,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 252,
      "t_ms": 2656.430569,
      "dur_ms": 9.630359,
      "text": " Alt",
      "token_texts": [
        " Alt"
      ]
    },
    {
      "idx": 253,
      "t_ms": 2666.060928,
      "dur_ms": 9.567606,
      "text": "itude",
      "token_texts": [
        "itude"
      ]
    },
    {
      "idx": 254,
      "t_ms": 2675.628534,
      "dur_ms": 9.513473,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 255,
      "t_ms": 2685.142007,
      "dur_ms": 9.594837,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    }
  ],
  "totals": {
    "tokens": 256,
    "wall_ms": 2694.736844,
    "tps": 95.0
  }
});
