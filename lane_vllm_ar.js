window.PTD_DEMO_LANES = window.PTD_DEMO_LANES || [];
window.PTD_DEMO_LANES.push({
  "schema": "ptd-demo-trace/v0",
  "lane": {
    "method": "vLLM",
    "engine": "vllm-ar-synthetic",
    "model": "Qwen/Qwen3-8B",
    "device": "SYNTHETIC",
    "dataset": "math500",
    "recorded": "synthetic",
    "timing_source": "synthetic",
    "run_config": {
      "note": "SYNTHETIC: timing simulated from a target TPS to approximate the visual; answer text + tree structure borrowed from recorded fixtures; not a measurement. Real run tape is a drop-in replacement (same schema).",
      "target_tps": 152.0
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
      "dur_ms": 63.152398,
      "text": "We",
      "token_texts": [
        "We"
      ]
    },
    {
      "idx": 1,
      "t_ms": 63.152398,
      "dur_ms": 4.954984,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 2,
      "t_ms": 68.107382,
      "dur_ms": 5.217169,
      "text": " given",
      "token_texts": [
        " given"
      ]
    },
    {
      "idx": 3,
      "t_ms": 73.324551,
      "dur_ms": 6.865795,
      "text": " that",
      "token_texts": [
        " that"
      ]
    },
    {
      "idx": 4,
      "t_ms": 80.190346,
      "dur_ms": 6.387615,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 5,
      "t_ms": 86.577961,
      "dur_ms": 6.254621,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 6,
      "t_ms": 92.832582,
      "dur_ms": 6.511448,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 7,
      "t_ms": 99.34403,
      "dur_ms": 6.006864,
      "text": " an",
      "token_texts": [
        " an"
      ]
    },
    {
      "idx": 8,
      "t_ms": 105.350894,
      "dur_ms": 6.377849,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 9,
      "t_ms": 111.728743,
      "dur_ms": 6.377989,
      "text": "isos",
      "token_texts": [
        "isos"
      ]
    },
    {
      "idx": 10,
      "t_ms": 118.106732,
      "dur_ms": 6.106313,
      "text": "ce",
      "token_texts": [
        "ce"
      ]
    },
    {
      "idx": 11,
      "t_ms": 124.213045,
      "dur_ms": 6.836791,
      "text": "les",
      "token_texts": [
        "les"
      ]
    },
    {
      "idx": 12,
      "t_ms": 131.049836,
      "dur_ms": 6.257025,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 13,
      "t_ms": 137.306861,
      "dur_ms": 6.403442,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 14,
      "t_ms": 143.710303,
      "dur_ms": 6.487287,
      "text": "**,",
      "token_texts": [
        "**,"
      ]
    },
    {
      "idx": 15,
      "t_ms": 150.19759,
      "dur_ms": 6.306757,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 16,
      "t_ms": 156.504347,
      "dur_ms": 6.352851,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 17,
      "t_ms": 162.857198,
      "dur_ms": 6.389803,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 18,
      "t_ms": 169.247001,
      "dur_ms": 6.247961,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 19,
      "t_ms": 175.494962,
      "dur_ms": 6.962756,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 20,
      "t_ms": 182.457718,
      "dur_ms": 5.497909,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 21,
      "t_ms": 187.955627,
      "dur_ms": 6.468768,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 22,
      "t_ms": 194.424395,
      "dur_ms": 6.8307,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 23,
      "t_ms": 201.255095,
      "dur_ms": 6.203631,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 24,
      "t_ms": 207.458726,
      "dur_ms": 6.306242,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 25,
      "t_ms": 213.764968,
      "dur_ms": 6.281767,
      "text": " has",
      "token_texts": [
        " has"
      ]
    },
    {
      "idx": 26,
      "t_ms": 220.046735,
      "dur_ms": 6.389914,
      "text": " length",
      "token_texts": [
        " length"
      ]
    },
    {
      "idx": 27,
      "t_ms": 226.436649,
      "dur_ms": 6.294985,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 28,
      "t_ms": 232.731634,
      "dur_ms": 6.554549,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 29,
      "t_ms": 239.286183,
      "dur_ms": 6.441051,
      "text": "4",
      "token_texts": [
        "4"
      ]
    },
    {
      "idx": 30,
      "t_ms": 245.727234,
      "dur_ms": 6.24645,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 31,
      "t_ms": 251.973684,
      "dur_ms": 6.149952,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 32,
      "t_ms": 258.123636,
      "dur_ms": 6.536932,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 33,
      "t_ms": 264.660568,
      "dur_ms": 6.275714,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 34,
      "t_ms": 270.936282,
      "dur_ms": 6.343398,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 35,
      "t_ms": 277.27968,
      "dur_ms": 6.473186,
      "text": " $.",
      "token_texts": [
        " $."
      ]
    },
    {
      "idx": 36,
      "t_ms": 283.752866,
      "dur_ms": 6.988908,
      "text": " We",
      "token_texts": [
        " We"
      ]
    },
    {
      "idx": 37,
      "t_ms": 290.741774,
      "dur_ms": 5.824964,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 38,
      "t_ms": 296.566738,
      "dur_ms": 6.507007,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 39,
      "t_ms": 303.073745,
      "dur_ms": 6.159345,
      "text": " find",
      "token_texts": [
        " find"
      ]
    },
    {
      "idx": 40,
      "t_ms": 309.23309,
      "dur_ms": 6.335153,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 41,
      "t_ms": 315.568243,
      "dur_ms": 6.177828,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 42,
      "t_ms": 321.746071,
      "dur_ms": 6.481019,
      "text": "area",
      "token_texts": [
        "area"
      ]
    },
    {
      "idx": 43,
      "t_ms": 328.22709,
      "dur_ms": 6.311024,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 44,
      "t_ms": 334.538114,
      "dur_ms": 6.414566,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 45,
      "t_ms": 340.95268,
      "dur_ms": 6.438806,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 46,
      "t_ms": 347.391486,
      "dur_ms": 6.262519,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 47,
      "t_ms": 353.654005,
      "dur_ms": 6.326667,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 48,
      "t_ms": 359.980672,
      "dur_ms": 6.362368,
      "text": "---\n\n",
      "token_texts": [
        "---\n\n"
      ]
    },
    {
      "idx": 49,
      "t_ms": 366.34304,
      "dur_ms": 6.320353,
      "text": "###",
      "token_texts": [
        "###"
      ]
    },
    {
      "idx": 50,
      "t_ms": 372.663393,
      "dur_ms": 6.515293,
      "text": " Step",
      "token_texts": [
        " Step"
      ]
    },
    {
      "idx": 51,
      "t_ms": 379.178686,
      "dur_ms": 6.247,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 52,
      "t_ms": 385.425686,
      "dur_ms": 6.305119,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 53,
      "t_ms": 391.730805,
      "dur_ms": 6.748875,
      "text": ":",
      "token_texts": [
        ":"
      ]
    },
    {
      "idx": 54,
      "t_ms": 398.47968,
      "dur_ms": 6.44627,
      "text": " Understand",
      "token_texts": [
        " Understand"
      ]
    },
    {
      "idx": 55,
      "t_ms": 404.92595,
      "dur_ms": 6.239275,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 56,
      "t_ms": 411.165225,
      "dur_ms": 6.660181,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 57,
      "t_ms": 417.825406,
      "dur_ms": 6.173252,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 58,
      "t_ms": 423.998658,
      "dur_ms": 6.343189,
      "text": "An",
      "token_texts": [
        "An"
      ]
    },
    {
      "idx": 59,
      "t_ms": 430.341847,
      "dur_ms": 6.044268,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 60,
      "t_ms": 436.386115,
      "dur_ms": 6.776894,
      "text": "isos",
      "token_texts": [
        "isos"
      ]
    },
    {
      "idx": 61,
      "t_ms": 443.163009,
      "dur_ms": 6.268314,
      "text": "ce",
      "token_texts": [
        "ce"
      ]
    },
    {
      "idx": 62,
      "t_ms": 449.431323,
      "dur_ms": 6.26577,
      "text": "les",
      "token_texts": [
        "les"
      ]
    },
    {
      "idx": 63,
      "t_ms": 455.697093,
      "dur_ms": 6.376997,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 64,
      "t_ms": 462.07409,
      "dur_ms": 6.167878,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 65,
      "t_ms": 468.241968,
      "dur_ms": 6.328785,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 66,
      "t_ms": 474.570753,
      "dur_ms": 6.308569,
      "text": " has",
      "token_texts": [
        " has"
      ]
    },
    {
      "idx": 67,
      "t_ms": 480.879322,
      "dur_ms": 6.567096,
      "text": ":\n",
      "token_texts": [
        ":\n"
      ]
    },
    {
      "idx": 68,
      "t_ms": 487.446418,
      "dur_ms": 6.396167,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 69,
      "t_ms": 493.842585,
      "dur_ms": 6.135179,
      "text": " Two",
      "token_texts": [
        " Two"
      ]
    },
    {
      "idx": 70,
      "t_ms": 499.977764,
      "dur_ms": 6.328887,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 71,
      "t_ms": 506.306651,
      "dur_ms": 6.381535,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 72,
      "t_ms": 512.688186,
      "dur_ms": 6.308127,
      "text": " equal",
      "token_texts": [
        " equal"
      ]
    },
    {
      "idx": 73,
      "t_ms": 518.996313,
      "dur_ms": 6.377546,
      "text": " length",
      "token_texts": [
        " length"
      ]
    },
    {
      "idx": 74,
      "t_ms": 525.373859,
      "dur_ms": 6.454098,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 75,
      "t_ms": 531.827957,
      "dur_ms": 6.199935,
      "text": " say",
      "token_texts": [
        " say"
      ]
    },
    {
      "idx": 76,
      "t_ms": 538.027892,
      "dur_ms": 6.528382,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 77,
      "t_ms": 544.556274,
      "dur_ms": 6.577463,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 78,
      "t_ms": 551.133737,
      "dur_ms": 6.32723,
      "text": " $\n",
      "token_texts": [
        " $\n"
      ]
    },
    {
      "idx": 79,
      "t_ms": 557.460967,
      "dur_ms": 6.386838,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 80,
      "t_ms": 563.847805,
      "dur_ms": 6.332732,
      "text": " A",
      "token_texts": [
        " A"
      ]
    },
    {
      "idx": 81,
      "t_ms": 570.180537,
      "dur_ms": 6.324523,
      "text": " right",
      "token_texts": [
        " right"
      ]
    },
    {
      "idx": 82,
      "t_ms": 576.50506,
      "dur_ms": 6.328979,
      "text": " angle",
      "token_texts": [
        " angle"
      ]
    },
    {
      "idx": 83,
      "t_ms": 582.834039,
      "dur_ms": 6.567243,
      "text": " between",
      "token_texts": [
        " between"
      ]
    },
    {
      "idx": 84,
      "t_ms": 589.401282,
      "dur_ms": 5.851383,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 85,
      "t_ms": 595.252665,
      "dur_ms": 6.644227,
      "text": " two",
      "token_texts": [
        " two"
      ]
    },
    {
      "idx": 86,
      "t_ms": 601.896892,
      "dur_ms": 6.57922,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 87,
      "t_ms": 608.476112,
      "dur_ms": 6.246673,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 88,
      "t_ms": 614.722785,
      "dur_ms": 6.294059,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 89,
      "t_ms": 621.016844,
      "dur_ms": 6.24872,
      "text": " The",
      "token_texts": [
        " The"
      ]
    },
    {
      "idx": 90,
      "t_ms": 627.265564,
      "dur_ms": 6.471759,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 91,
      "t_ms": 633.737323,
      "dur_ms": 6.293127,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 92,
      "t_ms": 640.03045,
      "dur_ms": 6.183435,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 93,
      "t_ms": 646.213885,
      "dur_ms": 6.432746,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 94,
      "t_ms": 652.646631,
      "dur_ms": 6.560438,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 95,
      "t_ms": 659.207069,
      "dur_ms": 6.198302,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 96,
      "t_ms": 665.405371,
      "dur_ms": 6.396928,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 97,
      "t_ms": 671.802299,
      "dur_ms": 6.245502,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 98,
      "t_ms": 678.047801,
      "dur_ms": 6.452256,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 99,
      "t_ms": 684.500057,
      "dur_ms": 6.297787,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 100,
      "t_ms": 690.797844,
      "dur_ms": 6.726948,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 101,
      "t_ms": 697.524792,
      "dur_ms": 6.038639,
      "text": " $\n\n",
      "token_texts": [
        " $\n\n"
      ]
    },
    {
      "idx": 102,
      "t_ms": 703.563431,
      "dur_ms": 7.114838,
      "text": "Let",
      "token_texts": [
        "Let"
      ]
    },
    {
      "idx": 103,
      "t_ms": 710.678269,
      "dur_ms": 5.981209,
      "text": "’s",
      "token_texts": [
        "’s"
      ]
    },
    {
      "idx": 104,
      "t_ms": 716.659478,
      "dur_ms": 6.082187,
      "text": " denote",
      "token_texts": [
        " denote"
      ]
    },
    {
      "idx": 105,
      "t_ms": 722.741665,
      "dur_ms": 6.304955,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 106,
      "t_ms": 729.04662,
      "dur_ms": 6.400446,
      "text": " legs",
      "token_texts": [
        " legs"
      ]
    },
    {
      "idx": 107,
      "t_ms": 735.447066,
      "dur_ms": 6.292473,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 108,
      "t_ms": 741.739539,
      "dur_ms": 6.346964,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 109,
      "t_ms": 748.086503,
      "dur_ms": 6.234459,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 110,
      "t_ms": 754.320962,
      "dur_ms": 6.902617,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 111,
      "t_ms": 761.223579,
      "dur_ms": 6.10748,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 112,
      "t_ms": 767.331059,
      "dur_ms": 6.478046,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 113,
      "t_ms": 773.809105,
      "dur_ms": 6.48662,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 114,
      "t_ms": 780.295725,
      "dur_ms": 6.225206,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 115,
      "t_ms": 786.520931,
      "dur_ms": 6.545,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 116,
      "t_ms": 793.065931,
      "dur_ms": 6.375234,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 117,
      "t_ms": 799.441165,
      "dur_ms": 5.937645,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 118,
      "t_ms": 805.37881,
      "dur_ms": 6.455098,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 119,
      "t_ms": 811.833908,
      "dur_ms": 6.1664,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 120,
      "t_ms": 818.000308,
      "dur_ms": 6.487966,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 121,
      "t_ms": 824.488274,
      "dur_ms": 6.346147,
      "text": "sqrt",
      "token_texts": [
        "sqrt"
      ]
    },
    {
      "idx": 122,
      "t_ms": 830.834421,
      "dur_ms": 6.405536,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 123,
      "t_ms": 837.239957,
      "dur_ms": 6.359944,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 124,
      "t_ms": 843.599901,
      "dur_ms": 6.54706,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 125,
      "t_ms": 850.146961,
      "dur_ms": 6.907076,
      "text": " $",
      "token_texts": [
        " $"
      ]
    },
    {
      "idx": 126,
      "t_ms": 857.054037,
      "dur_ms": 5.49079,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 127,
      "t_ms": 862.544827,
      "dur_ms": 6.775496,
      "text": "---\n\n",
      "token_texts": [
        "---\n\n"
      ]
    },
    {
      "idx": 128,
      "t_ms": 869.320323,
      "dur_ms": 6.912914,
      "text": "###",
      "token_texts": [
        "###"
      ]
    },
    {
      "idx": 129,
      "t_ms": 876.233237,
      "dur_ms": 5.611801,
      "text": " Step",
      "token_texts": [
        " Step"
      ]
    },
    {
      "idx": 130,
      "t_ms": 881.845038,
      "dur_ms": 6.188567,
      "text": " ",
      "token_texts": [
        " "
      ]
    },
    {
      "idx": 131,
      "t_ms": 888.033605,
      "dur_ms": 6.381022,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 132,
      "t_ms": 894.414627,
      "dur_ms": 6.550843,
      "text": ":",
      "token_texts": [
        ":"
      ]
    },
    {
      "idx": 133,
      "t_ms": 900.96547,
      "dur_ms": 6.079403,
      "text": " Use",
      "token_texts": [
        " Use"
      ]
    },
    {
      "idx": 134,
      "t_ms": 907.044873,
      "dur_ms": 6.664363,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 135,
      "t_ms": 913.709236,
      "dur_ms": 6.165298,
      "text": " formula",
      "token_texts": [
        " formula"
      ]
    },
    {
      "idx": 136,
      "t_ms": 919.874534,
      "dur_ms": 6.616576,
      "text": " for",
      "token_texts": [
        " for"
      ]
    },
    {
      "idx": 137,
      "t_ms": 926.49111,
      "dur_ms": 6.4601,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 138,
      "t_ms": 932.95121,
      "dur_ms": 5.950621,
      "text": " area",
      "token_texts": [
        " area"
      ]
    },
    {
      "idx": 139,
      "t_ms": 938.901831,
      "dur_ms": 6.350815,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 140,
      "t_ms": 945.252646,
      "dur_ms": 6.246354,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 141,
      "t_ms": 951.499,
      "dur_ms": 6.496807,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 142,
      "t_ms": 957.995807,
      "dur_ms": 6.573108,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 143,
      "t_ms": 964.568915,
      "dur_ms": 6.343923,
      "text": "The",
      "token_texts": [
        "The"
      ]
    },
    {
      "idx": 144,
      "t_ms": 970.912838,
      "dur_ms": 6.540632,
      "text": " area",
      "token_texts": [
        " area"
      ]
    },
    {
      "idx": 145,
      "t_ms": 977.45347,
      "dur_ms": 6.472353,
      "text": " of",
      "token_texts": [
        " of"
      ]
    },
    {
      "idx": 146,
      "t_ms": 983.925823,
      "dur_ms": 6.528491,
      "text": " a",
      "token_texts": [
        " a"
      ]
    },
    {
      "idx": 147,
      "t_ms": 990.454314,
      "dur_ms": 5.802829,
      "text": " triangle",
      "token_texts": [
        " triangle"
      ]
    },
    {
      "idx": 148,
      "t_ms": 996.257143,
      "dur_ms": 6.394253,
      "text": " is",
      "token_texts": [
        " is"
      ]
    },
    {
      "idx": 149,
      "t_ms": 1002.651396,
      "dur_ms": 6.435124,
      "text": ":\n\n",
      "token_texts": [
        ":\n\n"
      ]
    },
    {
      "idx": 150,
      "t_ms": 1009.08652,
      "dur_ms": 6.349359,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 151,
      "t_ms": 1015.435879,
      "dur_ms": 7.57932,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 152,
      "t_ms": 1023.015199,
      "dur_ms": 5.224085,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 153,
      "t_ms": 1028.239284,
      "dur_ms": 6.536352,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 154,
      "t_ms": 1034.775636,
      "dur_ms": 6.034086,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 155,
      "t_ms": 1040.809722,
      "dur_ms": 6.333398,
      "text": "Area",
      "token_texts": [
        "Area"
      ]
    },
    {
      "idx": 156,
      "t_ms": 1047.14312,
      "dur_ms": 6.275668,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 157,
      "t_ms": 1053.418788,
      "dur_ms": 6.769131,
      "text": " =",
      "token_texts": [
        " ="
      ]
    },
    {
      "idx": 158,
      "t_ms": 1060.187919,
      "dur_ms": 6.061422,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 159,
      "t_ms": 1066.249341,
      "dur_ms": 6.606633,
      "text": "frac",
      "token_texts": [
        "frac"
      ]
    },
    {
      "idx": 160,
      "t_ms": 1072.855974,
      "dur_ms": 6.474279,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 161,
      "t_ms": 1079.330253,
      "dur_ms": 6.247179,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 162,
      "t_ms": 1085.577432,
      "dur_ms": 6.276717,
      "text": "}{",
      "token_texts": [
        "}{"
      ]
    },
    {
      "idx": 163,
      "t_ms": 1091.854149,
      "dur_ms": 7.336078,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 164,
      "t_ms": 1099.190227,
      "dur_ms": 5.198383,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 165,
      "t_ms": 1104.38861,
      "dur_ms": 6.435465,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 166,
      "t_ms": 1110.824075,
      "dur_ms": 6.566033,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 167,
      "t_ms": 1117.390108,
      "dur_ms": 6.248728,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 168,
      "t_ms": 1123.638836,
      "dur_ms": 6.368657,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 169,
      "t_ms": 1130.007493,
      "dur_ms": 6.164342,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 170,
      "t_ms": 1136.171835,
      "dur_ms": 6.523832,
      "text": "base",
      "token_texts": [
        "base"
      ]
    },
    {
      "idx": 171,
      "t_ms": 1142.695667,
      "dur_ms": 6.373991,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 172,
      "t_ms": 1149.069658,
      "dur_ms": 6.363719,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 173,
      "t_ms": 1155.433377,
      "dur_ms": 6.738708,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 174,
      "t_ms": 1162.172085,
      "dur_ms": 6.080025,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 175,
      "t_ms": 1168.25211,
      "dur_ms": 6.280209,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 176,
      "t_ms": 1174.532319,
      "dur_ms": 6.276375,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 177,
      "t_ms": 1180.808694,
      "dur_ms": 6.528204,
      "text": "height",
      "token_texts": [
        "height"
      ]
    },
    {
      "idx": 178,
      "t_ms": 1187.336898,
      "dur_ms": 6.344936,
      "text": "}\n",
      "token_texts": [
        "}\n"
      ]
    },
    {
      "idx": 179,
      "t_ms": 1193.681834,
      "dur_ms": 6.442815,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 180,
      "t_ms": 1200.124649,
      "dur_ms": 6.343751,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 181,
      "t_ms": 1206.4684,
      "dur_ms": 6.557448,
      "text": "In",
      "token_texts": [
        "In"
      ]
    },
    {
      "idx": 182,
      "t_ms": 1213.025848,
      "dur_ms": 6.274107,
      "text": " this",
      "token_texts": [
        " this"
      ]
    },
    {
      "idx": 183,
      "t_ms": 1219.299955,
      "dur_ms": 5.783678,
      "text": " case",
      "token_texts": [
        " case"
      ]
    },
    {
      "idx": 184,
      "t_ms": 1225.083633,
      "dur_ms": 6.773939,
      "text": ",",
      "token_texts": [
        ","
      ]
    },
    {
      "idx": 185,
      "t_ms": 1231.857572,
      "dur_ms": 6.439937,
      "text": " we",
      "token_texts": [
        " we"
      ]
    },
    {
      "idx": 186,
      "t_ms": 1238.297509,
      "dur_ms": 6.564897,
      "text": " can",
      "token_texts": [
        " can"
      ]
    },
    {
      "idx": 187,
      "t_ms": 1244.862406,
      "dur_ms": 6.232407,
      "text": " use",
      "token_texts": [
        " use"
      ]
    },
    {
      "idx": 188,
      "t_ms": 1251.094813,
      "dur_ms": 6.572424,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 189,
      "t_ms": 1257.667237,
      "dur_ms": 6.44688,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 190,
      "t_ms": 1264.114117,
      "dur_ms": 5.735842,
      "text": "hyp",
      "token_texts": [
        "hyp"
      ]
    },
    {
      "idx": 191,
      "t_ms": 1269.849959,
      "dur_ms": 6.421619,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 192,
      "t_ms": 1276.271578,
      "dur_ms": 6.30965,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 193,
      "t_ms": 1282.581228,
      "dur_ms": 6.507662,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 194,
      "t_ms": 1289.08889,
      "dur_ms": 6.435237,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 195,
      "t_ms": 1295.524127,
      "dur_ms": 6.150503,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 196,
      "t_ms": 1301.67463,
      "dur_ms": 6.542703,
      "text": " base",
      "token_texts": [
        " base"
      ]
    },
    {
      "idx": 197,
      "t_ms": 1308.217333,
      "dur_ms": 6.232596,
      "text": " and",
      "token_texts": [
        " and"
      ]
    },
    {
      "idx": 198,
      "t_ms": 1314.449929,
      "dur_ms": 6.435294,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 199,
      "t_ms": 1320.885223,
      "dur_ms": 6.433776,
      "text": " **",
      "token_texts": [
        " **"
      ]
    },
    {
      "idx": 200,
      "t_ms": 1327.318999,
      "dur_ms": 6.476219,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 201,
      "t_ms": 1333.795218,
      "dur_ms": 6.463075,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 202,
      "t_ms": 1340.258293,
      "dur_ms": 6.574913,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 203,
      "t_ms": 1346.833206,
      "dur_ms": 6.979879,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    },
    {
      "idx": 204,
      "t_ms": 1353.813085,
      "dur_ms": 5.630658,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 205,
      "t_ms": 1359.443743,
      "dur_ms": 6.324417,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 206,
      "t_ms": 1365.76816,
      "dur_ms": 6.170394,
      "text": "**",
      "token_texts": [
        "**"
      ]
    },
    {
      "idx": 207,
      "t_ms": 1371.938554,
      "dur_ms": 6.529072,
      "text": " as",
      "token_texts": [
        " as"
      ]
    },
    {
      "idx": 208,
      "t_ms": 1378.467626,
      "dur_ms": 6.622854,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 209,
      "t_ms": 1385.09048,
      "dur_ms": 6.180034,
      "text": " height",
      "token_texts": [
        " height"
      ]
    },
    {
      "idx": 210,
      "t_ms": 1391.270514,
      "dur_ms": 6.338878,
      "text": ".\n\n",
      "token_texts": [
        ".\n\n"
      ]
    },
    {
      "idx": 211,
      "t_ms": 1397.609392,
      "dur_ms": 6.456987,
      "text": "So",
      "token_texts": [
        "So"
      ]
    },
    {
      "idx": 212,
      "t_ms": 1404.066379,
      "dur_ms": 5.929904,
      "text": ":\n\n",
      "token_texts": [
        ":\n\n"
      ]
    },
    {
      "idx": 213,
      "t_ms": 1409.996283,
      "dur_ms": 6.5022,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 214,
      "t_ms": 1416.498483,
      "dur_ms": 6.213099,
      "text": "\n",
      "token_texts": [
        "\n"
      ]
    },
    {
      "idx": 215,
      "t_ms": 1422.711582,
      "dur_ms": 6.416558,
      "text": "\\",
      "token_texts": [
        "\\"
      ]
    },
    {
      "idx": 216,
      "t_ms": 1429.12814,
      "dur_ms": 6.527571,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 217,
      "t_ms": 1435.655711,
      "dur_ms": 6.174306,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 218,
      "t_ms": 1441.830017,
      "dur_ms": 6.425691,
      "text": "Area",
      "token_texts": [
        "Area"
      ]
    },
    {
      "idx": 219,
      "t_ms": 1448.255708,
      "dur_ms": 6.293066,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 220,
      "t_ms": 1454.548774,
      "dur_ms": 6.40866,
      "text": " =",
      "token_texts": [
        " ="
      ]
    },
    {
      "idx": 221,
      "t_ms": 1460.957434,
      "dur_ms": 6.471688,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 222,
      "t_ms": 1467.429122,
      "dur_ms": 6.397467,
      "text": "frac",
      "token_texts": [
        "frac"
      ]
    },
    {
      "idx": 223,
      "t_ms": 1473.826589,
      "dur_ms": 6.277173,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 224,
      "t_ms": 1480.103762,
      "dur_ms": 6.394627,
      "text": "1",
      "token_texts": [
        "1"
      ]
    },
    {
      "idx": 225,
      "t_ms": 1486.498389,
      "dur_ms": 6.310469,
      "text": "}{",
      "token_texts": [
        "}{"
      ]
    },
    {
      "idx": 226,
      "t_ms": 1492.808858,
      "dur_ms": 6.439627,
      "text": "2",
      "token_texts": [
        "2"
      ]
    },
    {
      "idx": 227,
      "t_ms": 1499.248485,
      "dur_ms": 6.687665,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 228,
      "t_ms": 1505.93615,
      "dur_ms": 6.228463,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 229,
      "t_ms": 1512.164613,
      "dur_ms": 6.192876,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 230,
      "t_ms": 1518.357489,
      "dur_ms": 6.201486,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 231,
      "t_ms": 1524.558975,
      "dur_ms": 6.462609,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 232,
      "t_ms": 1531.021584,
      "dur_ms": 6.320608,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 233,
      "t_ms": 1537.342192,
      "dur_ms": 6.292482,
      "text": "hyp",
      "token_texts": [
        "hyp"
      ]
    },
    {
      "idx": 234,
      "t_ms": 1543.634674,
      "dur_ms": 6.264074,
      "text": "oten",
      "token_texts": [
        "oten"
      ]
    },
    {
      "idx": 235,
      "t_ms": 1549.898748,
      "dur_ms": 6.34026,
      "text": "use",
      "token_texts": [
        "use"
      ]
    },
    {
      "idx": 236,
      "t_ms": 1556.239008,
      "dur_ms": 6.557957,
      "text": "}",
      "token_texts": [
        "}"
      ]
    },
    {
      "idx": 237,
      "t_ms": 1562.796965,
      "dur_ms": 6.301509,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 238,
      "t_ms": 1569.098474,
      "dur_ms": 6.257489,
      "text": "times",
      "token_texts": [
        "times"
      ]
    },
    {
      "idx": 239,
      "t_ms": 1575.355963,
      "dur_ms": 6.462641,
      "text": " \\",
      "token_texts": [
        " \\"
      ]
    },
    {
      "idx": 240,
      "t_ms": 1581.818604,
      "dur_ms": 6.453089,
      "text": "text",
      "token_texts": [
        "text"
      ]
    },
    {
      "idx": 241,
      "t_ms": 1588.271693,
      "dur_ms": 6.229404,
      "text": "{",
      "token_texts": [
        "{"
      ]
    },
    {
      "idx": 242,
      "t_ms": 1594.501097,
      "dur_ms": 6.433287,
      "text": "altitude",
      "token_texts": [
        "altitude"
      ]
    },
    {
      "idx": 243,
      "t_ms": 1600.934384,
      "dur_ms": 6.330762,
      "text": "}\n",
      "token_texts": [
        "}\n"
      ]
    },
    {
      "idx": 244,
      "t_ms": 1607.265146,
      "dur_ms": 6.264689,
      "text": "$$",
      "token_texts": [
        "$$"
      ]
    },
    {
      "idx": 245,
      "t_ms": 1613.529835,
      "dur_ms": 6.444756,
      "text": "\n\n",
      "token_texts": [
        "\n\n"
      ]
    },
    {
      "idx": 246,
      "t_ms": 1619.974591,
      "dur_ms": 6.469345,
      "text": "We",
      "token_texts": [
        "We"
      ]
    },
    {
      "idx": 247,
      "t_ms": 1626.443936,
      "dur_ms": 6.4856,
      "text": " are",
      "token_texts": [
        " are"
      ]
    },
    {
      "idx": 248,
      "t_ms": 1632.929536,
      "dur_ms": 6.697275,
      "text": " given",
      "token_texts": [
        " given"
      ]
    },
    {
      "idx": 249,
      "t_ms": 1639.626811,
      "dur_ms": 6.214897,
      "text": ":\n",
      "token_texts": [
        ":\n"
      ]
    },
    {
      "idx": 250,
      "t_ms": 1645.841708,
      "dur_ms": 6.281891,
      "text": "-",
      "token_texts": [
        "-"
      ]
    },
    {
      "idx": 251,
      "t_ms": 1652.123599,
      "dur_ms": 6.129041,
      "text": " Alt",
      "token_texts": [
        " Alt"
      ]
    },
    {
      "idx": 252,
      "t_ms": 1658.25264,
      "dur_ms": 6.443658,
      "text": "itude",
      "token_texts": [
        "itude"
      ]
    },
    {
      "idx": 253,
      "t_ms": 1664.696298,
      "dur_ms": 6.64082,
      "text": " to",
      "token_texts": [
        " to"
      ]
    },
    {
      "idx": 254,
      "t_ms": 1671.337118,
      "dur_ms": 6.194358,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 255,
      "t_ms": 1677.531476,
      "dur_ms": 6.679049,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    }
  ],
  "totals": {
    "tokens": 256,
    "wall_ms": 1684.210525,
    "tps": 152.0
  }
});
