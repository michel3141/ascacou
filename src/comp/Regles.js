import React, { Component } from "react";
import "/src/css/Regles.css";
import { PublishRounded } from "@mui/icons-material";

const pjs = require("/src/../package.json");

export default class Regles extends Component {
  render = () => (
    <div className="Regles">
      <ul id="top">
        <li>
          <a href="#contenu">Contenu</a>
        </li>
        <li>
          <a href="#but">But</a>
        </li>
        <li>
          <a href="#préparation">Préparation</a>
        </li>
        <li>
          <a href="#tour-de-jeu">Tour de jeu</a>
        </li>
        <li>
          <a href="#blocage">Blocage</a>
        </li>
        <li>
          <a href="#variantes">Variantes</a>
        </li>
      </ul>
      <h1 style={{ textAlign: "center" }}>
        Association de Carrés
        <br /> et
        <br /> de Couleurs
      </h1>
      <p style={{ textAlign: "center" }}>
        <img
          src="img/100000000000013C00000176017FE24A41E0F645.jpg"
          style={{ width: "6.387cm", height: "7.535cm" }}
        />
      </p>

      <p style={{ textAlign: "center" }}>
        Jeu créé par Marc Buonomo
        <br />
        marcbuonomo26@gmail.com
      </p>
      <p style={{ textAlign: "center" }}>
        Site version {pjs.version} par{" "}
        <a href="https://github.com/michel3141">{pjs.author}</a>
      </p>

      <hr />
      <h2 id="contenu">
        Contenu
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>

      <ul>
        <li>un plateau carré : 5x5 positions,</li>
        <li>16 cartes motif différentes : 2x2 positions</li>
        <li>30 pions (15 noirs et 15 blancs)</li>
        <li>5 pions neutres (vert).</li>
      </ul>
      <h2 id="but">
        But
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>
      <p>
        Ascacou se joue à deux, en disposant chacun son tour les pions noirs et
        blancs sur le plateau.
      </p>
      <p>
        Le gagnant est celui qui a reproduit le plus de cartes motif de son jeu.
      </p>
      <p>La partie se termine quand aucun pion ne peut être posé.</p>
      <h2 id="préparation">
        Préparation
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>
      <p>
        Répartir les 16 cartes motif entre les joueurs, à leur convenance. La
        répartition peut également être aléatoire.
      </p>
      <p>
        Les cartes doivent être visibles de tous, et toutes orientées de la même
        façon que le plateau grâce à l'inscription Ascacou, afin d'éviter
        d'avoir deux cartes identiques.
      </p>
      <p>
        Les joueurs n’ont pas de couleur attribuée. Celui qui commence est tiré
        au sort.
      </p>
      <h2 id="tour-de-jeu">
        Tour de jeu
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>
      <p>
        À son tour, le joueur choisit et pose un pion de couleur sur le plateau.
        La seule contrainte est qu’une carte motif ne peut être présente qu'une
        seule fois sur le plateau.
      </p>
      <p>
        Dès qu'une carte motif est reproduite sur le plateau, elle est mise de
        côté par le joueur qui la possède et ce joueur marque un point.
      </p>
      <table style={{ textAlign: "center", width: "100%" }}>
        <tbody>
          <tr className="odd">
            <td>
              <img
                className="Plateau"
                src="img/1000000000000071000000875A7E52B12142BB18.jpg"
              />
            </td>
            <td>
              <p>Carte reproduite</p>
              <p>
                <img
                  className="Carte"
                  src="img/100000000000002D00000036A3FE065D9632E68D.jpg"
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Toute carte reproduite est mise de côté, même si un joueur reproduit une
        carte de son adversaire.
      </p>
      <p>
        Les cartes déjà reproduites sur le plateau, et mises de côté, restent
        visibles, et permettent ainsi de vérifier qu'elles ne seront pas
        reproduites une nouvelle fois.
      </p>
      <p>
        Plusieurs cartes motif (4 au maximum) peuvent être reproduite en même
        temps, avec un seul pion joué. Elles sont alors toutes mises de côté.
      </p>
      <table style={{ textAlign: "center", width: "100%" }}>
        <tbody>
          <tr className="odd">
            <td>
              <img
                className="Plateau"
                src="img/100000000000007100000087DFB228A471609B16.jpg"
              />
            </td>
            <td>
              <p>
                En jouant un pion noir entre les deux pions blancs, on reproduit
                les cartes :
              </p>
              <p>
                <img
                  className="Carte"
                  src="img/100000000000008C000000A87317F4896CA6D119.png"
                />
                <img
                  className="Carte"
                  src="img/100000000000008C000000A8E110F53E54B6FFD9.png"
                />
              </p>
            </td>
          </tr>
          <tr className="even">
            <td>
              <img
                className="Plateau"
                src="img/100000000000007100000087CEB676665D7F11B8.jpg"
              />
            </td>
            <td>
              <p>
                On ne peut pas jouer un pion blanc entre les deux pions blancs
                sinon la carte
              </p>
              <p>
                <img
                  className="Carte"
                  src="img/100000000000002D000000360BEA7FAC9C4847CD.jpg"
                />
              </p>
              <p>serait présente deux fois sur le plateau</p>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 id="blocage">
        Blocage
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>
      <p>
        Une carte motif ne pouvant être reproduite qu'une seule fois sur le
        plateau, certaines positions du plateau peuvent donc devenir interdites
      </p>
      <table style={{ textAlign: "center", width: "100%" }}>
        <tbody>
          <tr className="odd">
            <td>
              <img
                className="Plateau"
                src="img/100000000000007100000087AAFEA097B5664748.jpg"
              />
            </td>
            <td>
              <p>Cartes déjà reproduites</p>
              <p>
                <img
                  className="Carte"
                  src="img/100000000000008C000000A85906570A090FB8B7.png"
                />{" "}
                <img
                  className="Carte"
                  src="img/100000000000008C000000A8E110F53E54B6FFD9.png"
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        On utilise les pions neutres pour signifier qu’une position est devenue
        interdite.
      </p>
      <h2 id="variantes">
        Variantes
        <a href="#top">
          <PublishRounded />
        </a>
      </h2>
      <h2 id="sans-blocage">Sans blocage</h2>
      <p>
        À son tour, un joueur choisit et pose un pion de couleur sur le plateau,
        sans contrainte. Si une carte est reproduite plusieurs fois sur le
        plateau, elle ne comptera qu'un seul point.
      </p>
      <h2 id="pion-imposé">Pion imposé</h2>
      <p>
        Le joueur tiré au sort pour commencer la partie doit également tirer au
        sort un pion noir ou blanc.
      </p>
      <p>
        Après avoir joué son propre coup, le joueur choisit la couleur du pion
        qui sera joué par son adversaire.
      </p>

      <p style={{ textAlign: "right" }}>
        <a href="regles.pdf" target="_blank">
          Télécharger la règles
        </a>
      </p>
    </div>
  );
}
