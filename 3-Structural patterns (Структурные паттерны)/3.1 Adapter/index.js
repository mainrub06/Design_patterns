// -------------------------- Example - 1 --------------------------

// Есть библиотека (представим, как класс), которая читает на входе текст и возвращает аудио начитку на русском.

class Recorder {
  static say(value, format) {
    if (typeof value !== "string") {
      return Error("Value is not a string!");
    }

    return `${value}.${format}`;
  }
}

// И есть другая библиотека, которая переводит аудио на Английский

class TranslateToEnglish {
  constructor(recorder) {
    this.recorder = recorder;
  }

  translateAudioToMp3(file) {
    return this.recorder.getMp3(file);
  }

  translateAudioToFlac(file) {
    return this.recorder.getFlac(file);
  }
}

// Для работоспособности переводика нужна библиотека, которая имеет два метода .getMp3 и .getFlac

const text =
  "Сoffee became available in England no later than the 16th century";

const englishTranslate = new TranslateToEnglish(Recorder);
const result = englishTranslate.translateAudioToFlac(text); // вот тут и возникнет ошибка, которую можно исправить с помощью паттерна адаптера

// Определяем адаптер из того класса, где не хватает тех самых методов

class RecorderAdapter {
  static getMp3(text) {
    return Recorder.say(text, "mp3");
  }

  static getFlac(text) {
    return Recorder.say(text, "flac");
  }
}

const englishSecondChance = new TranslateToEnglish(RecorderAdapter);
const result = englishTranslate.translateAudioToFlac(text);
