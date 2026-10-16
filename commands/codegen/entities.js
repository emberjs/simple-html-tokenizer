// lifted from jshint
// oxlint-disable-next-line no-control-regex -- matching control chars is the point
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;

export default function buildEntitiesModule(body) {
  let data = JSON.parse(body);
  let dest = `export default {\n`;
  let seen = Object.create(null);
  let entities = Object.keys(data);
  let len = entities.length;
  let entity, name, characters, literal;
  for (let i = 0; i < len; i++) {
    entity = entities[i];
    if (entity[entity.length - 1] === ';') {
      name = entity.slice(1, -1);
    } else {
      name = entity.slice(1);
    }
    if (seen[name]) {
      continue;
    }
    seen[name] = true;
    if (i > 0) {
      dest += ',';
    }
    characters = data[entity].characters;
    if (UNSAFE.test(characters)) {
      literal = codepointsLiteral(data[entity].codepoints);
    } else {
      literal = JSON.stringify(characters);
    }
    dest += name + ':' + literal;
  }
  dest += '\n};\n';
  return dest;
}

function codepointLiteral(codepoint) {
  return '\\u' + codepoint.toString(16).padStart(4, '0');
}

function codepointsLiteral(codepoints) {
  return '"' + codepoints.map(codepointLiteral).join('') + '"';
}
