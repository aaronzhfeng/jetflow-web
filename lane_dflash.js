window.PTD_DEMO_LANES = window.PTD_DEMO_LANES || [];
window.PTD_DEMO_LANES.push({
  "schema": "ptd-demo-trace/v0",
  "lane": {
    "method": "DFlash",
    "engine": "z-lab-dflash-synthetic",
    "model": "Qwen/Qwen3-8B",
    "device": "SYNTHETIC",
    "dataset": "math500",
    "recorded": "synthetic",
    "timing_source": "synthetic",
    "run_config": {
      "note": "SYNTHETIC: timing simulated from a target TPS to approximate the visual; answer text + tree structure borrowed from recorded fixtures; not a measurement. Real run tape is a drop-in replacement (same schema).",
      "target_tps": 834.0999999999999
    }
  },
  "prompt": {
    "id": "math500[1]",
    "text": "In a certain isosceles right triangle, the altitude to the hypotenuse has length $4\\sqrt{2}$.  What is the area of the triangle?\nPlease reason step by step, and put your final answer within \\boxed{}.",
    "chat_template": "server-side enable_thinking=False"
  },
  "events": [
    {
      "idx": 0,
      "t_ms": 0.0,
      "dur_ms": 22.246665,
      "text": "We",
      "token_texts": [
        "We"
      ]
    },
    {
      "idx": 1,
      "t_ms": 22.246665,
      "dur_ms": 6.611204,
      "text": " are given that",
      "token_texts": [
        " are",
        " given",
        " that"
      ]
    },
    {
      "idx": 2,
      "t_ms": 28.857869,
      "dur_ms": 6.899529,
      "text": " the",
      "token_texts": [
        " the"
      ]
    },
    {
      "idx": 3,
      "t_ms": 35.757398,
      "dur_ms": 8.242954,
      "text": " triangle is an **isosceles right triangle",
      "token_texts": [
        " triangle",
        " is",
        " an",
        " **",
        "isos",
        "ce",
        "les",
        " right",
        " triangle"
      ]
    },
    {
      "idx": 4,
      "t_ms": 44.000352,
      "dur_ms": 6.672815,
      "text": "**, and the **altitude to the hypotenuse",
      "token_texts": [
        "**,",
        " and",
        " the",
        " **",
        "altitude",
        " to",
        " the",
        " hyp",
        "oten",
        "use"
      ]
    },
    {
      "idx": 5,
      "t_ms": 50.673167,
      "dur_ms": 8.072221,
      "text": "** has length $ 4\\sqrt{2} $.",
      "token_texts": [
        "**",
        " has",
        " length",
        " $",
        " ",
        "4",
        "\\",
        "sqrt",
        "{",
        "2",
        "}",
        " $."
      ]
    },
    {
      "idx": 6,
      "t_ms": 58.745388,
      "dur_ms": 7.520556,
      "text": " We are to find the **area** of the triangle.\n\n---\n\n### Step 1",
      "token_texts": [
        " We",
        " are",
        " to",
        " find",
        " the",
        " **",
        "area",
        "**",
        " of",
        " the",
        " triangle",
        ".\n\n",
        "---\n\n",
        "###",
        " Step",
        " ",
        "1"
      ]
    },
    {
      "idx": 7,
      "t_ms": 66.265944,
      "dur_ms": 8.048809,
      "text": ": Understand the triangle\n\nAn **isosceles right triangle**",
      "token_texts": [
        ":",
        " Understand",
        " the",
        " triangle",
        "\n\n",
        "An",
        " **",
        "isos",
        "ce",
        "les",
        " right",
        " triangle",
        "**"
      ]
    },
    {
      "idx": 8,
      "t_ms": 74.314753,
      "dur_ms": 6.95088,
      "text": " has:\n",
      "token_texts": [
        " has",
        ":\n"
      ]
    },
    {
      "idx": 9,
      "t_ms": 81.265633,
      "dur_ms": 7.321532,
      "text": "- Two legs",
      "token_texts": [
        "-",
        " Two",
        " legs"
      ]
    },
    {
      "idx": 10,
      "t_ms": 88.587165,
      "dur_ms": 7.827165,
      "text": " of equal",
      "token_texts": [
        " of",
        " equal"
      ]
    },
    {
      "idx": 11,
      "t_ms": 96.41433,
      "dur_ms": 7.779788,
      "text": " length,",
      "token_texts": [
        " length",
        ","
      ]
    },
    {
      "idx": 12,
      "t_ms": 104.194118,
      "dur_ms": 7.521558,
      "text": " say $ a $\n",
      "token_texts": [
        " say",
        " $",
        " a",
        " $\n"
      ]
    },
    {
      "idx": 13,
      "t_ms": 111.715676,
      "dur_ms": 7.428577,
      "text": "- A right",
      "token_texts": [
        "-",
        " A",
        " right"
      ]
    },
    {
      "idx": 14,
      "t_ms": 119.144253,
      "dur_ms": 7.667033,
      "text": " angle between",
      "token_texts": [
        " angle",
        " between"
      ]
    },
    {
      "idx": 15,
      "t_ms": 126.811286,
      "dur_ms": 7.82526,
      "text": " the two legs",
      "token_texts": [
        " the",
        " two",
        " legs"
      ]
    },
    {
      "idx": 16,
      "t_ms": 134.636546,
      "dur_ms": 7.507559,
      "text": "\n- The hypotenuse is $ a\\",
      "token_texts": [
        "\n",
        "-",
        " The",
        " hyp",
        "oten",
        "use",
        " is",
        " $",
        " a",
        "\\"
      ]
    },
    {
      "idx": 17,
      "t_ms": 142.144105,
      "dur_ms": 7.36626,
      "text": "sqrt{2} $\n\nLet",
      "token_texts": [
        "sqrt",
        "{",
        "2",
        "}",
        " $\n\n",
        "Let"
      ]
    },
    {
      "idx": 18,
      "t_ms": 149.510365,
      "dur_ms": 7.566574,
      "text": "’s",
      "token_texts": [
        "’s"
      ]
    },
    {
      "idx": 19,
      "t_ms": 157.076939,
      "dur_ms": 7.533258,
      "text": " denote the legs",
      "token_texts": [
        " denote",
        " the",
        " legs"
      ]
    },
    {
      "idx": 20,
      "t_ms": 164.610197,
      "dur_ms": 7.348659,
      "text": " as $ a $, and",
      "token_texts": [
        " as",
        " $",
        " a",
        " $",
        ",",
        " and"
      ]
    },
    {
      "idx": 21,
      "t_ms": 171.958856,
      "dur_ms": 7.584364,
      "text": " the hypotenuse as $ a\\sqrt{2} $.\n\n---\n\n### Step",
      "token_texts": [
        " the",
        " hyp",
        "oten",
        "use",
        " as",
        " $",
        " a",
        "\\",
        "sqrt",
        "{",
        "2",
        "}",
        " $",
        ".\n\n",
        "---\n\n",
        "###",
        " Step"
      ]
    },
    {
      "idx": 22,
      "t_ms": 179.54322,
      "dur_ms": 7.862133,
      "text": " 2: Use the formula for the area",
      "token_texts": [
        " ",
        "2",
        ":",
        " Use",
        " the",
        " formula",
        " for",
        " the",
        " area"
      ]
    },
    {
      "idx": 23,
      "t_ms": 187.405353,
      "dur_ms": 7.465321,
      "text": " of a triangle",
      "token_texts": [
        " of",
        " a",
        " triangle"
      ]
    },
    {
      "idx": 24,
      "t_ms": 194.870674,
      "dur_ms": 7.54625,
      "text": "\n\nThe area of",
      "token_texts": [
        "\n\n",
        "The",
        " area",
        " of"
      ]
    },
    {
      "idx": 25,
      "t_ms": 202.416924,
      "dur_ms": 7.334897,
      "text": " a triangle is",
      "token_texts": [
        " a",
        " triangle",
        " is"
      ]
    },
    {
      "idx": 26,
      "t_ms": 209.751821,
      "dur_ms": 8.172409,
      "text": ":\n\n$$\n\\text{Area} = \\frac{1}{2} \\",
      "token_texts": [
        ":\n\n",
        "$$",
        "\n",
        "\\",
        "text",
        "{",
        "Area",
        "}",
        " =",
        " \\",
        "frac",
        "{",
        "1",
        "}{",
        "2",
        "}",
        " \\"
      ]
    },
    {
      "idx": 27,
      "t_ms": 217.92423,
      "dur_ms": 7.471967,
      "text": "times \\text{base} \\times \\text{height}\n$$\n\nIn",
      "token_texts": [
        "times",
        " \\",
        "text",
        "{",
        "base",
        "}",
        " \\",
        "times",
        " \\",
        "text",
        "{",
        "height",
        "}\n",
        "$$",
        "\n\n",
        "In"
      ]
    },
    {
      "idx": 28,
      "t_ms": 225.396197,
      "dur_ms": 7.40773,
      "text": " this case, we",
      "token_texts": [
        " this",
        " case",
        ",",
        " we"
      ]
    },
    {
      "idx": 29,
      "t_ms": 232.803927,
      "dur_ms": 7.604398,
      "text": " can use the **hyp",
      "token_texts": [
        " can",
        " use",
        " the",
        " **",
        "hyp"
      ]
    },
    {
      "idx": 30,
      "t_ms": 240.408325,
      "dur_ms": 7.295263,
      "text": "otenuse** as the base,",
      "token_texts": [
        "oten",
        "use",
        "**",
        " as",
        " the",
        " base",
        ","
      ]
    },
    {
      "idx": 31,
      "t_ms": 247.703588,
      "dur_ms": 8.203037,
      "text": " and the **altitude to",
      "token_texts": [
        " and",
        " the",
        " **",
        "altitude",
        " to"
      ]
    },
    {
      "idx": 32,
      "t_ms": 255.906625,
      "dur_ms": 7.165586,
      "text": " the hypotenuse** as the height.\n\nSo:\n\n$$\n\\text",
      "token_texts": [
        " the",
        " hyp",
        "oten",
        "use",
        "**",
        " as",
        " the",
        " height",
        ".\n\n",
        "So",
        ":\n\n",
        "$$",
        "\n",
        "\\",
        "text"
      ]
    },
    {
      "idx": 33,
      "t_ms": 263.072211,
      "dur_ms": 7.293634,
      "text": "{Area} = \\frac{1}{2} \\times \\text{hyp",
      "token_texts": [
        "{",
        "Area",
        "}",
        " =",
        " \\",
        "frac",
        "{",
        "1",
        "}{",
        "2",
        "}",
        " \\",
        "times",
        " \\",
        "text",
        "{",
        "hyp"
      ]
    },
    {
      "idx": 34,
      "t_ms": 270.365845,
      "dur_ms": 7.551707,
      "text": "otenuse} \\times \\text{altitude}\n$$\n\nWe are given",
      "token_texts": [
        "oten",
        "use",
        "}",
        " \\",
        "times",
        " \\",
        "text",
        "{",
        "altitude",
        "}\n",
        "$$",
        "\n\n",
        "We",
        " are",
        " given"
      ]
    },
    {
      "idx": 35,
      "t_ms": 277.917552,
      "dur_ms": 7.890892,
      "text": ":\n",
      "token_texts": [
        ":\n"
      ]
    },
    {
      "idx": 36,
      "t_ms": 285.808444,
      "dur_ms": 7.025712,
      "text": "- Alt",
      "token_texts": [
        "-",
        " Alt"
      ]
    },
    {
      "idx": 37,
      "t_ms": 292.834156,
      "dur_ms": 7.518572,
      "text": "itude to",
      "token_texts": [
        "itude",
        " to"
      ]
    },
    {
      "idx": 38,
      "t_ms": 300.352728,
      "dur_ms": 6.564905,
      "text": " hyp",
      "token_texts": [
        " hyp"
      ]
    }
  ],
  "totals": {
    "tokens": 256,
    "wall_ms": 306.917633,
    "tps": 834.1
  }
});
