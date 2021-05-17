#!/bin/bash
CSS="../../css/img"

map () {
    FILE=$1
    WIDTH=$2
    shift
    shift
    IMG=""
    i=0
    for c in $*; do
       IMG="$IMG $CSS/case-$c-$i.png"
       i=$(expr $i + 1)
    done
    montage -verbose -geometry +0+0 -tile 5x5 $IMG tmp.png
    convert -resize 250x $CSS/titre.png tmp2.png
    montage -verbose -geometry +0+0 -tile 1x2 tmp2.png tmp.png $FILE
    mogrify -verbose -resize ${WIDTH}x $FILE
}
convert -verbose -resize 45x54   $CSS/motif-0-1122.png 100000000000002D000000360BEA7FAC9C4847CD.jpg
convert -verbose -resize 140x168 $CSS/motif-0-1112.png 100000000000008C000000A8E110F53E54B6FFD9.png
convert -verbose -resize 140x168 $CSS/motif-0-1112.png 100000000000002D00000036A3FE065D9632E68D.jpg
convert -verbose -resize 140x168 $CSS/motif-0-1121.png 100000000000008C000000A87317F4896CA6D119.png
convert -verbose -resize 140x168 $CSS/motif-0-2122.png 100000000000008C000000A85906570A090FB8B7.png
map 100000000000013C00000176017FE24A41E0F645.jpg 316  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0
map 1000000000000071000000875A7E52B12142BB18.jpg 113  0 0 0 0 0  0 0 1 1 0  0 0 1 2 0  0 0 0 0 0  0 0 0 0 0
map 100000000000007100000087DFB228A471609B16.jpg 113  0 0 0 0 0  0 1 1 1 0  0 2 1 2 0  0 0 0 0 0  0 0 0 0 0
map 100000000000007100000087AAFEA097B5664748.jpg 113  2 1 1 0 0  2 3 2 1 1  0 0 2 1 2  0 0 2 2 0  0 0 0 0 0
map 100000000000007100000087CEB676665D7F11B8.jpg 113  0 0 0 0 0  0 1 1 1 0  0 2 2x 2 0 0 0 0 0 0  0 0 0 0 0
cp -v $CSS/icon* .
#
#
#
rm tmp.png tmp2.png
