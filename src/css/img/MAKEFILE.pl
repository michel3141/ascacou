#!/usr/bin/perl

$out = "";
$out .= "noirblanc:
\tconvert noir.png -resize 160x160 1.png
\tconvert blanc.png -resize 160x160 2.png
\tconvert vert.png -resize 160x160 3.png
\tconvert titre.png -resize 350x motif-top-0.png
\tconvert titre.png -resize 350x -gamma 0.5 motif-top-1.png

clean:
\trm -rf case-1* case-2* case-3* motif-0-* motif-1-* icon*
\n

cleanall: clean
\trm -rf 1.png 2.png 3.png motif-top-* Makefile
\n";

@all = ();
for $case(0..24) {
  for $col (1..3) {
    for $x ('', 'x') {
      $out .= "case-$col$x-$case.png: case-0-$case.png $col.png\n";
      $out .= "\tcomposite -gravity center $col.png case-0-$case.png \$\@\n";
      if($x) {
        $out .= "\tcomposite -gravity center croix.png \$\@ \$\@\n";
      }
      $out .= "\n";
      push @all, "case-$col$x-$case.png";
    }
  }
}

%motif = (
  1111 => 16,
  1112 => 12,
  1121 => 6,
  1122 => 3,
  1211 => 7,
  1212 => 17,
  1221 => 0,
  1222 => 13,
  2111 => 11,
  2112 => 2,
  2121 => 15,
  2122 => 5,
  2211 => 1,
  2212 => 8,
  2221 => 10,
  2222 => 18,
);

for $active (0..1) {
  for $motif (keys %motif) {
    @motif = split //, $motif;
    $i1 = $motif{$motif};
    $i2 = $motif{$motif}+1;
    $i3 = $motif{$motif}+5;
    $i4 = $motif{$motif}+6;
    $c1 = "case-$motif[0]-$i1.png";
    $c2 = "case-$motif[1]-$i2.png";
    $c3 = "case-$motif[2]-$i3.png";
    $c4 = "case-$motif[3]-$i4.png";
    $out .= "motif-$active-$motif.png: motif-top-$active.png $c1 $c2 $c3 $c4\n";
    $out .= "\tmontage -geometry 175x175+0+0 -tile 2x2 $c1 $c2 $c3 $c4 tmp.png\n";
    $out .= "\tmontage -geometry +0+0 -tile 1x2 motif-top-$active.png tmp.png \$\@\n";
    $out .= "\t\@rm tmp.png\n\n";

    push @all, "motif-$active-$motif.png";
  }
}
$a=-1;$iconlist = join " ", map {$a++;"case-$_-$a.png"} split //,"1221121122221122112221122";
$out .= "icon.png: $iconlist
\tmontage -geometry +0+0 -tile 5x5 $iconlist tmp.png\n";
for $size (qw/48 64 128 192 256/) {
  $out .= "\tconvert -resize ${size}x${size} tmp.png icon_$size.png\n";
}
$out .= "\tln -sf icon_48.png \$\@\n";
$out .= "\t\@rm tmp.png\n\n";
push @all, "icon.png";

open MAKEFILE, '>Makefile';
print MAKEFILE "all: @all\n$out"
