#!/usr/bin/perl

$out = "";
$out .= "1.png:
\tconvert noir.png -resize 160x160 1.png

2.png:
\tconvert blanc.png -resize 160x160 2.png

3.png:
\tconvert vert.png -resize 160x160 3.png

clean:
\trm -rf case-0* case-1* case-2* case-3* motif-0-* motif-1-* icon*
\n

cleanall: clean
\trm -rf 1.png 2.png 3.png Makefile
\n";

@all = ();
for $case(0..24) {
  for $col (1..3) {
    for $x ('', 'x') {
      $out .= "case-$col$x-$case.png: org/case-0-$case.png $col.png\n";
      $out .= "\tcomposite -gravity center $col.png org/case-0-$case.png \$\@\n";
      if($x) {
        $out .= "\tcomposite -gravity center croix.png \$\@ \$\@\n";
      }
      $out .= "\tmogrify -interlace Plane -resize 50x \$\@\n";
      $out .= "\n";
      push @all, "case-$col$x-$case.png";
    }
  }
}
for $case(0..24) {
      $out .= "case-0-$case.png: org/case-0-$case.png\n";
      $out .= "\tconvert -interlace Plane -resize 50x org/\$\@ \$\@\n";
      $out .= "\n";
      push @all, "case-0-$case.png";
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
    $out .= "motif-$active-$motif.png: $c1 $c2 $c3 $c4\n";
    $out .= "\tmontage -geometry 175x175+0+0 -tile 2x2 $c1 $c2 $c3 $c4 \$\@\n";
    $out .= "\tmogrify -interlace Plane -resize 85x \$\@\n\n";

    push @all, "motif-$active-$motif.png";
  }
}
$a=-1;$iconlist = join " ", map {$a++;"case-$_-$a.png"} split //,"1221121122221122112221122";
$out .= "icon.png: $iconlist
\tmontage -geometry +0+0 -tile 5x5 $iconlist tmp.png\n";
for $size (qw/48 64 128 192 256/) {
  $out .= "\tconvert -interlace Plane -resize ${size}x${size} tmp.png icon_$size.png\n";
}
$out .= "\tln -sf icon_48.png \$\@\n";
$out .= "\t\@rm tmp.png\n\n";
push @all, "icon.png";

my %car = (
  S => "0121 0200 0121 0002 0121 ",
  C => "0212 0100 0200 0100 0212 ",
  A => "0121 0202 0121 0202 0101 ",
  O => "0121 0202 0101 0202 0121 ",
  U => "0202 0101 0202 0101 0212 ",
);
%car = (
  S => "0333 0300 0333 0003 0333 ",
  C => "0333 0300 0300 0300 0333 ",
  A => "0333 0303 0333 0303 0303 ",
  O => "0333 0303 0303 0303 0333 ",
  U => "0303 0303 0303 0303 0333 ",
);
%car = (
  S => "0011 0100 0010 0001 0110 ",
  C => "0022 0200 0200 0200 0022 ",
  A => "0010 0101 0111 0101 0101 ",
  O => "0010 0101 0101 0101 0010 ",
  U => "0202 0202 0202 0202 0020 ",
);
for my $car (keys %car) {
  $a=-1;$iconlist = join " ", map {$a++;$_ ne ' '?"case-$_-$a.png":''} split //,$car{$car};
  $a=-1;$iconlist = join " ", map {$a++;$_ ne ' '?"$_.png":''} split //,$car{$car};
  $out .= "$car.png: $iconlist\n";
  $out .= "\tmontage -geometry +20+20 -background none -tile 4x5 $iconlist tmp.png\n";
  my $size = 148;
  $out .= "\tconvert -resize x${size} tmp.png \$\@\n";
  $out .= "\t\@rm tmp.png\n\n";
  push @all, "$car.png";
}
#montage -geometry +0+0 -tile 7x1 -gravity south -background none icon_192.png S.png C.png A.png C.png O.png U.png toto.png

open MAKEFILE, '>Makefile';
print MAKEFILE "all: @all\n$out"
