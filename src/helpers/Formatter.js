import wpautop from 'wpautop';

export default class Formatter {

  static wpTextToParagraphs(text, br = true) {
    if (typeof text !== 'string' ) return '';

    return wpautop(text, br);
  }

}