/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Converter } from './zzz';
const list1 = [
  'aurore',
  'nébuleuse ',
  'dorade',
  'saturne',
  'comète',
  'flèche',
  'vénus',
  'télescope',
  'licorne',
  'paon',
  'cassiopée',
  'vierge',
  'chien',
  'sculpteur',
  'étoile',
  'arbre',
  'triangle',
  'bélier',
  'pégase',
  'loup',
  'écu',
  'orion',
  'éclaircie',
  'ourse',
  'fleuve',
  'colline',
  'dauphin',
  'couronne',
  'brouillard',
  'nuage',
  'fourneau',
  'centaure',
  'lièvre',
  'grêle',
  'éridan',
  'poissons',
  'balance',
  'lac',
  'chevelure',
  'horloge',
  'terre',
  'ophiuchus',
  'octant',
  'lynx',
  'oiseau',
];
const list2 = [
  'halo',
  'étang',
  'soleil',
  'océan',
  'colombe',
  'uranus',
  'jupiter',
  'peintre',
  'giboulées',
  'compas',
  'cheval',
  'rocher',
  'château',
  'sagittaire',
  'plateau',
  'autel',
  'carène',
  'tonnerre',
  'forêt',
  'poisson',
  'mars',
  'serpent',
  'grue',
  'toucan',
  'baleine',
  'neige',
  'voiles',
  'capricorne',
  'satellite',
  'falaise',
  'titan',
  'coupe',
  'caillou',
  'constellation',
  'lune',
  'mer',
  'croix',
  'microscope',
  'sextant',
  'renard',
  'plante',
  'mercure',
  'cygne',
  'tempête',
  'galaxie',
];
const list3 = [
  'règle',
  'corbeau',
  'phénix',
  'pluton',
  'andromède',
  'girafe',
  'verseau',
  'massif',
  'sommet',
  'eau',
  'hercule',
  'indien',
  'éclair',
  'dôme',
  'astéroïde',
  'persée',
  'pluie',
  'taureau',
  'table',
  'buisson',
  'neptune',
  'scorpion',
  'caméléon',
  'vent',
  'poupe',
  'lyre',
  'lion',
  'bouvier',
  'mouche',
  'machine',
  'pic',
  'réticule',
  'volcan',
  'lézard',
  'dragon',
  'gémeaux',
  'mirage',
  'burin',
  'rivière',
  'cocher',
  'phobos',
  'boussole',
  'hydre',
  'montagne',
  'cancer',
];
const { decode, encode, mod } = Converter([list1, list2, list3]);
console.log('encode/decode', mod);
window.e = encode;
window.d = decode;

export { decode, encode };
