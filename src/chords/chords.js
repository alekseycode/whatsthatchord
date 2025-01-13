const chordTypes = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  flat5: [0, 4, 6],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  2: [0, 2, 4, 7],
  4: [0, 4, 5, 7],
  6: [0, 4, 7, 9],
  7: [0, 4, 7, 10],
  "7 (missing 5)": [0, 4, 10],
  major7: [0, 4, 7, 11],
  major7flat5: [0, 4, 6, 11],
  minor7: [0, 3, 7, 10],
  augmented7: [0, 4, 8, 10],
  augmentedmajor7: [0, 4, 8, 11],
  minormajor7: [0, 3, 7, 11],
  minor7flat5: [0, 3, 6, 10],
  minormajor7flat5: [0, 3, 6, 11],
  diminished7: [0, 3, 6, 9],
  9: [0, 4, 7, 10, 14],
  minor9: [0, 3, 7, 10, 14],
  major9: [0, 4, 7, 11, 14],
  minormajor9: [0, 3, 7, 11, 14],
  11: [0, 4, 7, 10, 14, 17],
  minor11: [0, 3, 7, 10, 14, 17],
  major11: [0, 4, 7, 11, 14, 17],
  minormajor11: [0, 3, 7, 11, 14, 17],
  13: [0, 4, 7, 10, 14, 17, 21],
  minor13: [0, 3, 7, 10, 14, 17, 21],
  major13: [0, 4, 7, 11, 14, 17, 21],
  minormajor13: [0, 3, 7, 11, 14, 17, 21],
};

const noteToNumber = {
  C3: 0,
  Cs3: 1,
  D3: 2,
  Ds3: 3,
  E3: 4,
  F3: 5,
  Fs3: 6,
  G3: 7,
  Gs3: 8,
  A3: 9,
  As3: 10,
  B3: 11,
  C4: 12,
  Cs4: 13,
  D4: 14,
  Ds4: 15,
  E4: 16,
  F4: 17,
  Fs4: 18,
  G4: 19,
  Gs4: 20,
  A4: 21,
  As4: 22,
  B4: 23,
};

const checkForRootChord = (notes) => {
  // notes = ['C4', 'A3', 'Fs3', 'D3'] "D7"
  const noteObjects = notes
    .map((note) => ({ [note]: noteToNumber[note] }))
    .sort((a, b) => Object.values(a)[0] - Object.values(b)[0]);

  let rootValue = Object.values(noteObjects[0])[0];
  let rootName = Object.keys(noteObjects[0])[0];

  // [{"D3": 2}, {"Fs3": 6}, {"A3": 9}]
  function getIntervals(rootValue, noteObjects) {
    return noteObjects.map((obj) => Object.values(obj)[0] - rootValue);
  }

  let intervals = getIntervals(rootValue, noteObjects);

  for (const [chordName, chordPattern] of Object.entries(chordTypes)) {
    if (JSON.stringify(intervals) === JSON.stringify(chordPattern)) {
      return `${rootName
        .replace(/\d+$/, "")
        .replace("s", "#")}${chordName} (Root position)`;
    }
  }

  // check for octaves

  intervals = intervals
    .map((interval) => {
      if (interval > 11) {
        return interval - 12;
      }
      return interval;
    })
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  for (const [chordName, chordPattern] of Object.entries(chordTypes)) {
    if (JSON.stringify(intervals) === JSON.stringify(chordPattern)) {
      return `${rootName
        .replace(/\d+$/, "")
        .replace("s", "#")}${chordName} (Root position)`;
    }
  }

  return "";
};

const checkForInversion = (notes) => {
  // ["E3", "G3", "C4"]
  const noteObjects = notes
    .map((note) => ({ [note]: noteToNumber[note] }))
    .sort((a, b) => Object.values(a)[0] - Object.values(b)[0]);

  // [{"E3": 4}, {"G3": 7}, {"C4": 12}]

  function subtractOctaves(array) {
    return array.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      return { [key]: value > 11 ? value - 12 : value };
    });
  }

  const subtractedNoteObjects = subtractOctaves(noteObjects);

  function removeDuplicatesByValue(array) {
    const uniqueValues = new Set();
    const result = [];

    for (const obj of array) {
      const value = Object.values(obj)[0];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        result.push(obj);
      }
    }

    return result;
  }

  let uniqueNoteObjects = removeDuplicatesByValue(subtractedNoteObjects);

  // [{"E3": 4}, {"G3": 7}, {"C4": 0}]

  function shiftArray(arr) {
    return [arr[arr.length - 1]].concat(arr.slice(0, -1));
  }

  function getIntervals(rootValue, noteObjects) {
    return noteObjects.map((obj) => Object.values(obj)[0] - rootValue);
  }

  for (let i = 1; i < notes.length; i++) {
    uniqueNoteObjects = shiftArray(uniqueNoteObjects);

    let rootValue = Object.values(uniqueNoteObjects[0])[0];

    let intervals = getIntervals(rootValue, uniqueNoteObjects);

    for (const [chordName, chordPattern] of Object.entries(chordTypes)) {
      if (JSON.stringify(intervals) === JSON.stringify(chordPattern)) {
        const inversion = i === 1 ? "1st inversion" : `${i}nd inversion`;

        return `${Object.keys(uniqueNoteObjects[0])[0]
          .replace(/\d+$/, "")
          .replace("s", "#")}${chordName} (${inversion})`;
      }
    }
  }

  return "";
};

export function detectChord(notes) {
  let retVal = "";
  if (notes.length < 3) return retVal;

  retVal = checkForRootChord(notes);

  if (!retVal) retVal = checkForInversion(notes);

  if (!retVal) retVal = "Unknown Chord";

  return retVal;
}
