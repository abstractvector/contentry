import wpautop from 'wpautop';

export default class Formatter {

  static wpParse(text) {
    if (typeof text !== 'string' ) return '';

    return this.wpUnAutoP(
      this.wpTextToParagraphs(
        text
      )
    );
  }

  static wpUnAutoP(text) {
    // regex adapted from ./wordpress/wp-includes/formatting.php#shortcode_unautop()
    // replaced *+ with *
    // replaced fancy $spaces with \s
    // replaced list of tags with generic character match
    const regex = new RegExp(
      '<p>'                              // Opening paragraph
      + '(?:\s)*'            // Optional leading whitespace
      + '('                                // 1: The shortcode
      +     '\\['                          // Opening bracket
      +     "([A-Za-z0-9\-]+)"                 // 2: Shortcode name
      +     '(?![\\w-])'                   // Not followed by word character or hyphen
                                          // Unroll the loop: Inside the opening shortcode tag
      +     '[^\\]\\/]*'                   // Not a closing bracket or forward slash
      +     '(?:'
      +         '\\/(?!\\])'               // A forward slash not followed by a closing bracket
      +         '[^\\]\\/]*'               // Not a closing bracket or forward slash
      +     ')*?'
      +     '(?:'
      +         '\\/\\]'                   // Self closing tag and closing bracket
      +     '|'
      +         '\\]'                      // Closing bracket
      +         '(?:'                      // Unroll the loop: Optionally, anything between the opening and closing shortcode tags
      +             '[^\\[]*'             // Not an opening bracket
      +             '(?:'
      +                 '\\[(?!\\/\\2\\])' // An opening bracket not followed by the closing shortcode tag
      +                 '[^\\[]*'         // Not an opening bracket
      +             ')*'
      +             '\\[\\/\\2\\]'         // Closing shortcode tag
      +         ')?'
      +     ')'
      + ')'
      + '(?:\s)*'            // optional trailing whitespace
      + '<\\/p>'                           // closing paragraph
      , 'mg');

      text = text.replace(regex, (m, p1) => {
        return p1;
      });

      return text;
  }

  static wpTextToParagraphs(text, br = true) {
    return wpautop(text, br);
  }

}