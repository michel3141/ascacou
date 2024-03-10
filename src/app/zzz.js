function extgcd (a, b) {
  if (a < b) {
    const tmp = extgcd(b, a);
    return { gcd: tmp.gcd, x: tmp.y, y: tmp.x };
  }

  if (b === 0) {
    return { gcd: a, x: 1, y: 0 };
  }

  const r = a % b;
  const tmp = extgcd(b, r);

  return { gcd: tmp.gcd, x: tmp.y, y: tmp.x - Math.floor(a / b) * tmp.y };
}

const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
  197, 199,
];

export const Converter = (lists = [['a', 'b', 'c', 'd']]) => {
  // enlève les doublons
  // les accents, les majuscules
  // les cararctère non alphabétique
  lists = lists.map((list) => [...new Set(list)]);
  const n = lists.length;
  const bases = lists.map((list) => list.length);
  const mod = bases.reduce((acc, base) => acc * base, 1);

  let primeStart = 0;
  let found = false;
  let privateKey;
  let publicKey;
  while (!found) {
    /*
     * il suffit que la clé soit un nombre premier avec mod.
     * L'idée de base était de trouvé une clé qui fasse changer
     * tous les mots à chaque itération.
     * Mais ça ne fonctionne pas avec des bases différentes :-/
     */
    /*
     * tests
     * a=[];for(i=0;i<mod;i++){a.push(i)}
     * a.map(x=>D(E(x))===x).reduce((a,v)=>a&&v,true) === true // retour Ok
     * [...new Set(a.map(x=>E(x)))].length === mod // tous différents
     */

    let primeIndex = primeStart;
    primeStart++;
    privateKey = 0;
    for (let i = 0; i < n; i++) {
      if (primeIndex >= primes.length) {
        throw new Error('impossible de trouver une clé');
      }
      const prime = primes[primeIndex];
      primeIndex++;
      const { gcd } = extgcd(prime, bases[i]);
      if (gcd === 1) {
        privateKey = privateKey * bases[i] + prime;
      } else {
        i--;
        continue;
      }
    }
    privateKey = privateKey % mod;
    const { gcd, x } = extgcd(privateKey, mod);
    publicKey = ((x % mod) + mod) % mod;
    found = gcd === 1;
  }
  const n2a = (x) => {
    x = parseInt(x);
    x = ((x + 1) * privateKey) % mod;
    x = ((x % mod) + mod) % mod;
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(x % bases[i]);
      x = Math.floor(x / bases[i]);
    }
    return a;
  };

  const a2n = (a) => {
    let x = 0;
    for (let i = 0; i < n; i++) {
      x *= bases[n - 1 - i];
      x += a.pop();
      x = ((x % mod) + mod) % mod;
    }
    return (x * publicKey - 1 + mod) % mod;
  };

  const encode = (x, flat = false) => {
    const a = n2a(x);
    const s = a
      .map((i, index) => {
        const word = lists[index][i];
        if (flat) {
          return word
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .replace(/[^a-z]/g, '');
        } else {
          return word;
        }
      })
      .join('.');
    return s;
  };
  const decode = (s) => {
    let a = s
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/^[^a-z]*/, '')
      .replace(/[^a-z]*$/, '')
      .split(/[^a-z]+/);
    if (a.length !== n) {
      throw new Error('format invalide');
    }
    a = a.map((x, index) => {
      const i = lists[index]
        .map((word) =>
          word
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .replace(/[^a-z]/g, ''),
        )
        .indexOf(x);
      if (i > -1) {
        return i;
      } else {
        throw new Error('format invalide');
      }
    });
    const x = a2n(a);
    return x;
  };
  return { encode, decode, mod };
};

export default (list, n) => Converter(Array(n).fill(list));
