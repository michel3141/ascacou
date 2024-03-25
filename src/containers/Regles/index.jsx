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

import './Regles.scss';
import { PublishRounded } from '@mui/icons-material';
import _100000000000002D000000360BEA7FAC9C4847CD from '~assets/img/100000000000002D000000360BEA7FAC9C4847CD.jpg';
import _100000000000002D00000036A3FE065D9632E68D from '~assets/img/100000000000002D00000036A3FE065D9632E68D.jpg';
import _1000000000000071000000875A7E52B12142BB18 from '~assets/img/1000000000000071000000875A7E52B12142BB18.jpg';
import _100000000000007100000087AAFEA097B5664748 from '~assets/img/100000000000007100000087AAFEA097B5664748.jpg';
import _100000000000007100000087CEB676665D7F11B8 from '~assets/img/100000000000007100000087CEB676665D7F11B8.jpg';
import _100000000000007100000087DFB228A471609B16 from '~assets/img/100000000000007100000087DFB228A471609B16.jpg';
import _100000000000008C000000A85906570A090FB8B7 from '~assets/img/100000000000008C000000A85906570A090FB8B7.png';
import _100000000000008C000000A87317F4896CA6D119 from '~assets/img/100000000000008C000000A87317F4896CA6D119.png';
import _100000000000008C000000A8E110F53E54B6FFD9 from '~assets/img/100000000000008C000000A8E110F53E54B6FFD9.png';
import _100000000000013C00000176017FE24A41E0F645 from '~assets/img/100000000000013C00000176017FE24A41E0F645.jpg';

import pjs from '~~/package.json';
import regles from '~assets/img/regles.pdf';

export default function Regles() {
  return (
    <div className='Regles'>
      <ul id='top'>
        <li>
          <a href='#contenu'>Contenu</a>
        </li>
        <li>
          <a href='#but'>But</a>
        </li>
        <li>
          <a href='#préparation'>Préparation</a>
        </li>
        <li>
          <a href='#tour-de-jeu'>Tour de jeu</a>
        </li>
        <li>
          <a href='#blocage'>Blocage</a>
        </li>
        <li>
          <a href='#variantes'>Variantes</a>
        </li>
      </ul>
      <h1 style={{ textAlign: 'center' }}>
        Association de Carrés
        <br /> et
        <br /> de Couleurs
      </h1>
      <p style={{ textAlign: 'center' }}>
        <img
          src={_100000000000013C00000176017FE24A41E0F645}
          style={{ width: '6.387cm', height: '7.535cm' }}
        />
      </p>

      <p style={{ textAlign: 'center' }}>
        Jeu créé par Marc Buonomo
        <br />
        marcbuonomo26@gmail.com
      </p>
      <p style={{ textAlign: 'center' }}>
        App en ligne par <a href='https://github.com/michel3141'>{pjs.author}</a>
      </p>

      <hr />
      <h1>Règles d&apos;ascacou</h1>
      <p>
        Ascacou est un jeu de société stratégique qui se joue à deux joueurs. Voici les éléments
        principaux et les règles du jeu :
      </p>
      <h2 id='contenu'>
        Contenu du jeu
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <ul>
        <li>Un plateau carré de 5x5 cases</li>
        <li>16 cartes-motifs différentes de taille 2x2</li>
        <li>30 pions (15 noirs et 15 blancs)</li>
        <li>7 pions neutres (vert).</li>
      </ul>

      <h2 id='but'>
        But du jeu
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <p>
        Le joueur qui reproduit le plus grand nombre de cartes-motifs de son jeu remporte la partie.
        La partie se termine lorsque aucun pion ne peut être posé sur le plateau.
      </p>

      <h2 id='préparation'>
        Préparation
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <ul>
        <li>
          Répartissez les 16 cartes-motifs entre les joueurs de manière aléatoire ou selon leur
          convenance.
        </li>
        <li>
          Les cartes doivent être visibles de tous et orientées de la même façon que le plateau
          grâce à l&apos;inscription &quot;Ascacou&quot;.
        </li>
        <li>Le premier joueur est tiré au sort.</li>
      </ul>

      <h2 id='tour-de-jeu'>
        Tour de jeu
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <p> À son tour, chaque joueur place un pion de sa couleur sur le plateau.</p>
      <p>
        {' '}
        La seule contrainte est qu&apos;une carte-motif ne peut être présente qu&apos;une seule fois
        sur le plateau.
      </p>
      <p> Si un joueur reproduit une carte-motif, il la met de côté et marque un point.</p>
      <table style={{ textAlign: 'center', width: '100%' }}>
        <tbody>
          <tr className='odd'>
            <td>
              <img
                className='Plateau'
                src={_1000000000000071000000875A7E52B12142BB18}
              />
            </td>
            <td>
              <p>Carte reproduite</p>
              <p>
                <img
                  className='Carte'
                  src={_100000000000002D00000036A3FE065D9632E68D}
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        {' '}
        Toute carte-motif reproduite marque un point, même si c&apos;est une reproduction de la
        carte de l&apos;adversaire.
      </p>
      <p>
        {' '}
        Plusieurs cartes-motifs (maximum 4) peuvent être reproduites en même temps avec un seul pion
        joué.
      </p>
      <table style={{ textAlign: 'center', width: '100%' }}>
        <tbody>
          <tr className='odd'>
            <td>
              <img
                className='Plateau'
                src={_100000000000007100000087DFB228A471609B16}
              />
            </td>
            <td>
              <p>En jouant un pion noir entre les deux pions blancs, on reproduit les cartes :</p>
              <p>
                <img
                  className='Carte'
                  src={_100000000000008C000000A87317F4896CA6D119}
                />
                <img
                  className='Carte'
                  src={_100000000000008C000000A8E110F53E54B6FFD9}
                />
              </p>
            </td>
          </tr>
          <tr className='even'>
            <td>
              <img
                className='Plateau'
                src={_100000000000007100000087CEB676665D7F11B8}
              />
            </td>
            <td>
              <p>On ne peut pas jouer un pion blanc entre les deux pions blancs sinon la carte</p>
              <p>
                <img
                  className='Carte'
                  src={_100000000000002D000000360BEA7FAC9C4847CD}
                />
              </p>
              <p>serait présente deux fois sur le plateau</p>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id='blocage'>
        Blocage
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <p> Une carte-motif ne peut être reproduite qu&apos;une seule fois sur le plateau.</p>
      <p> Les positions où une carte-motif a déjà été reproduite deviennent interdites.</p>
      <p> Les pions neutres sont utilisés pour indiquer les positions interdites.</p>
      <table style={{ textAlign: 'center', width: '100%' }}>
        <tbody>
          <tr className='odd'>
            <td>
              <img
                className='Plateau'
                src={_100000000000007100000087AAFEA097B5664748}
              />
            </td>
            <td>
              <p>Cartes déjà reproduites</p>
              <p>
                <img
                  className='Carte'
                  src={_100000000000008C000000A85906570A090FB8B7}
                />{' '}
                <img
                  className='Carte'
                  src={_100000000000008C000000A8E110F53E54B6FFD9}
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id='variantes'>
        Variantes
        <a href='#top'>
          <PublishRounded />
        </a>
      </h2>
      <ul>
        <li>
          <strong>Sans blocage</strong> : Les joueurs peuvent placer des pions sans contraintes. Si
          une carte est reproduite plusieurs fois, elle ne compte qu&apos;un seul point.
        </li>
        <li>
          <strong>Pion imposé</strong> : Le joueur tiré au sort pour commencer choisit également la
          couleur du pion (noir ou blanc) que son adversaire devra jouer après son propre coup.
        </li>
      </ul>
      <p>
        Ascacou offre ainsi différentes stratégies et variantes, ajoutant de la profondeur au jeu et
        permettant aux joueurs de développer leur propre approche pour maximiser la reproduction des
        cartes motifs.
      </p>
      <p style={{ textAlign: 'right' }}>
        <a
          href={regles}
          target='_blank'
          rel='noreferrer'
        >
          Télécharger la règles
        </a>
      </p>
    </div>
  );
}
