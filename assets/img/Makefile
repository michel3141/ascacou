all: case-1-0.png case-1x-0.png case-2-0.png case-2x-0.png case-3-0.png case-3x-0.png case-1-1.png case-1x-1.png case-2-1.png case-2x-1.png case-3-1.png case-3x-1.png case-1-2.png case-1x-2.png case-2-2.png case-2x-2.png case-3-2.png case-3x-2.png case-1-3.png case-1x-3.png case-2-3.png case-2x-3.png case-3-3.png case-3x-3.png case-1-4.png case-1x-4.png case-2-4.png case-2x-4.png case-3-4.png case-3x-4.png case-1-5.png case-1x-5.png case-2-5.png case-2x-5.png case-3-5.png case-3x-5.png case-1-6.png case-1x-6.png case-2-6.png case-2x-6.png case-3-6.png case-3x-6.png case-1-7.png case-1x-7.png case-2-7.png case-2x-7.png case-3-7.png case-3x-7.png case-1-8.png case-1x-8.png case-2-8.png case-2x-8.png case-3-8.png case-3x-8.png case-1-9.png case-1x-9.png case-2-9.png case-2x-9.png case-3-9.png case-3x-9.png case-1-10.png case-1x-10.png case-2-10.png case-2x-10.png case-3-10.png case-3x-10.png case-1-11.png case-1x-11.png case-2-11.png case-2x-11.png case-3-11.png case-3x-11.png case-1-12.png case-1x-12.png case-2-12.png case-2x-12.png case-3-12.png case-3x-12.png case-1-13.png case-1x-13.png case-2-13.png case-2x-13.png case-3-13.png case-3x-13.png case-1-14.png case-1x-14.png case-2-14.png case-2x-14.png case-3-14.png case-3x-14.png case-1-15.png case-1x-15.png case-2-15.png case-2x-15.png case-3-15.png case-3x-15.png case-1-16.png case-1x-16.png case-2-16.png case-2x-16.png case-3-16.png case-3x-16.png case-1-17.png case-1x-17.png case-2-17.png case-2x-17.png case-3-17.png case-3x-17.png case-1-18.png case-1x-18.png case-2-18.png case-2x-18.png case-3-18.png case-3x-18.png case-1-19.png case-1x-19.png case-2-19.png case-2x-19.png case-3-19.png case-3x-19.png case-1-20.png case-1x-20.png case-2-20.png case-2x-20.png case-3-20.png case-3x-20.png case-1-21.png case-1x-21.png case-2-21.png case-2x-21.png case-3-21.png case-3x-21.png case-1-22.png case-1x-22.png case-2-22.png case-2x-22.png case-3-22.png case-3x-22.png case-1-23.png case-1x-23.png case-2-23.png case-2x-23.png case-3-23.png case-3x-23.png case-1-24.png case-1x-24.png case-2-24.png case-2x-24.png case-3-24.png case-3x-24.png case-0-0.png case-0-1.png case-0-2.png case-0-3.png case-0-4.png case-0-5.png case-0-6.png case-0-7.png case-0-8.png case-0-9.png case-0-10.png case-0-11.png case-0-12.png case-0-13.png case-0-14.png case-0-15.png case-0-16.png case-0-17.png case-0-18.png case-0-19.png case-0-20.png case-0-21.png case-0-22.png case-0-23.png case-0-24.png motif-0-1221.png motif-0-1212.png motif-0-1121.png motif-0-1112.png motif-0-2222.png motif-0-2211.png motif-0-2122.png motif-0-2111.png motif-0-1111.png motif-0-1122.png motif-0-1211.png motif-0-1222.png motif-0-2112.png motif-0-2121.png motif-0-2212.png motif-0-2221.png motif-1-1221.png motif-1-1212.png motif-1-1121.png motif-1-1112.png motif-1-2222.png motif-1-2211.png motif-1-2122.png motif-1-2111.png motif-1-1111.png motif-1-1122.png motif-1-1211.png motif-1-1222.png motif-1-2112.png motif-1-2121.png motif-1-2212.png motif-1-2221.png icon.png S.png C.png O.png U.png A.png
1.png:
	convert noir.png -resize 160x160 1.png

2.png:
	convert blanc.png -resize 160x160 2.png

3.png:
	convert vert.png -resize 160x160 3.png

clean:
	rm -rf case-0* case-1* case-2* case-3* motif-0-* motif-1-* icon*



cleanall: clean
	rm -rf 1.png 2.png 3.png Makefile

case-1-0.png: org/case-0-0.png 1.png
	composite -gravity center 1.png org/case-0-0.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-0.png: org/case-0-0.png 1.png
	composite -gravity center 1.png org/case-0-0.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-0.png: org/case-0-0.png 2.png
	composite -gravity center 2.png org/case-0-0.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-0.png: org/case-0-0.png 2.png
	composite -gravity center 2.png org/case-0-0.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-0.png: org/case-0-0.png 3.png
	composite -gravity center 3.png org/case-0-0.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-0.png: org/case-0-0.png 3.png
	composite -gravity center 3.png org/case-0-0.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-1.png: org/case-0-1.png 1.png
	composite -gravity center 1.png org/case-0-1.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-1.png: org/case-0-1.png 1.png
	composite -gravity center 1.png org/case-0-1.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-1.png: org/case-0-1.png 2.png
	composite -gravity center 2.png org/case-0-1.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-1.png: org/case-0-1.png 2.png
	composite -gravity center 2.png org/case-0-1.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-1.png: org/case-0-1.png 3.png
	composite -gravity center 3.png org/case-0-1.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-1.png: org/case-0-1.png 3.png
	composite -gravity center 3.png org/case-0-1.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-2.png: org/case-0-2.png 1.png
	composite -gravity center 1.png org/case-0-2.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-2.png: org/case-0-2.png 1.png
	composite -gravity center 1.png org/case-0-2.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-2.png: org/case-0-2.png 2.png
	composite -gravity center 2.png org/case-0-2.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-2.png: org/case-0-2.png 2.png
	composite -gravity center 2.png org/case-0-2.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-2.png: org/case-0-2.png 3.png
	composite -gravity center 3.png org/case-0-2.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-2.png: org/case-0-2.png 3.png
	composite -gravity center 3.png org/case-0-2.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-3.png: org/case-0-3.png 1.png
	composite -gravity center 1.png org/case-0-3.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-3.png: org/case-0-3.png 1.png
	composite -gravity center 1.png org/case-0-3.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-3.png: org/case-0-3.png 2.png
	composite -gravity center 2.png org/case-0-3.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-3.png: org/case-0-3.png 2.png
	composite -gravity center 2.png org/case-0-3.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-3.png: org/case-0-3.png 3.png
	composite -gravity center 3.png org/case-0-3.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-3.png: org/case-0-3.png 3.png
	composite -gravity center 3.png org/case-0-3.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-4.png: org/case-0-4.png 1.png
	composite -gravity center 1.png org/case-0-4.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-4.png: org/case-0-4.png 1.png
	composite -gravity center 1.png org/case-0-4.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-4.png: org/case-0-4.png 2.png
	composite -gravity center 2.png org/case-0-4.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-4.png: org/case-0-4.png 2.png
	composite -gravity center 2.png org/case-0-4.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-4.png: org/case-0-4.png 3.png
	composite -gravity center 3.png org/case-0-4.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-4.png: org/case-0-4.png 3.png
	composite -gravity center 3.png org/case-0-4.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-5.png: org/case-0-5.png 1.png
	composite -gravity center 1.png org/case-0-5.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-5.png: org/case-0-5.png 1.png
	composite -gravity center 1.png org/case-0-5.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-5.png: org/case-0-5.png 2.png
	composite -gravity center 2.png org/case-0-5.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-5.png: org/case-0-5.png 2.png
	composite -gravity center 2.png org/case-0-5.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-5.png: org/case-0-5.png 3.png
	composite -gravity center 3.png org/case-0-5.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-5.png: org/case-0-5.png 3.png
	composite -gravity center 3.png org/case-0-5.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-6.png: org/case-0-6.png 1.png
	composite -gravity center 1.png org/case-0-6.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-6.png: org/case-0-6.png 1.png
	composite -gravity center 1.png org/case-0-6.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-6.png: org/case-0-6.png 2.png
	composite -gravity center 2.png org/case-0-6.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-6.png: org/case-0-6.png 2.png
	composite -gravity center 2.png org/case-0-6.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-6.png: org/case-0-6.png 3.png
	composite -gravity center 3.png org/case-0-6.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-6.png: org/case-0-6.png 3.png
	composite -gravity center 3.png org/case-0-6.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-7.png: org/case-0-7.png 1.png
	composite -gravity center 1.png org/case-0-7.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-7.png: org/case-0-7.png 1.png
	composite -gravity center 1.png org/case-0-7.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-7.png: org/case-0-7.png 2.png
	composite -gravity center 2.png org/case-0-7.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-7.png: org/case-0-7.png 2.png
	composite -gravity center 2.png org/case-0-7.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-7.png: org/case-0-7.png 3.png
	composite -gravity center 3.png org/case-0-7.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-7.png: org/case-0-7.png 3.png
	composite -gravity center 3.png org/case-0-7.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-8.png: org/case-0-8.png 1.png
	composite -gravity center 1.png org/case-0-8.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-8.png: org/case-0-8.png 1.png
	composite -gravity center 1.png org/case-0-8.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-8.png: org/case-0-8.png 2.png
	composite -gravity center 2.png org/case-0-8.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-8.png: org/case-0-8.png 2.png
	composite -gravity center 2.png org/case-0-8.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-8.png: org/case-0-8.png 3.png
	composite -gravity center 3.png org/case-0-8.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-8.png: org/case-0-8.png 3.png
	composite -gravity center 3.png org/case-0-8.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-9.png: org/case-0-9.png 1.png
	composite -gravity center 1.png org/case-0-9.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-9.png: org/case-0-9.png 1.png
	composite -gravity center 1.png org/case-0-9.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-9.png: org/case-0-9.png 2.png
	composite -gravity center 2.png org/case-0-9.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-9.png: org/case-0-9.png 2.png
	composite -gravity center 2.png org/case-0-9.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-9.png: org/case-0-9.png 3.png
	composite -gravity center 3.png org/case-0-9.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-9.png: org/case-0-9.png 3.png
	composite -gravity center 3.png org/case-0-9.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-10.png: org/case-0-10.png 1.png
	composite -gravity center 1.png org/case-0-10.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-10.png: org/case-0-10.png 1.png
	composite -gravity center 1.png org/case-0-10.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-10.png: org/case-0-10.png 2.png
	composite -gravity center 2.png org/case-0-10.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-10.png: org/case-0-10.png 2.png
	composite -gravity center 2.png org/case-0-10.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-10.png: org/case-0-10.png 3.png
	composite -gravity center 3.png org/case-0-10.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-10.png: org/case-0-10.png 3.png
	composite -gravity center 3.png org/case-0-10.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-11.png: org/case-0-11.png 1.png
	composite -gravity center 1.png org/case-0-11.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-11.png: org/case-0-11.png 1.png
	composite -gravity center 1.png org/case-0-11.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-11.png: org/case-0-11.png 2.png
	composite -gravity center 2.png org/case-0-11.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-11.png: org/case-0-11.png 2.png
	composite -gravity center 2.png org/case-0-11.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-11.png: org/case-0-11.png 3.png
	composite -gravity center 3.png org/case-0-11.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-11.png: org/case-0-11.png 3.png
	composite -gravity center 3.png org/case-0-11.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-12.png: org/case-0-12.png 1.png
	composite -gravity center 1.png org/case-0-12.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-12.png: org/case-0-12.png 1.png
	composite -gravity center 1.png org/case-0-12.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-12.png: org/case-0-12.png 2.png
	composite -gravity center 2.png org/case-0-12.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-12.png: org/case-0-12.png 2.png
	composite -gravity center 2.png org/case-0-12.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-12.png: org/case-0-12.png 3.png
	composite -gravity center 3.png org/case-0-12.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-12.png: org/case-0-12.png 3.png
	composite -gravity center 3.png org/case-0-12.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-13.png: org/case-0-13.png 1.png
	composite -gravity center 1.png org/case-0-13.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-13.png: org/case-0-13.png 1.png
	composite -gravity center 1.png org/case-0-13.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-13.png: org/case-0-13.png 2.png
	composite -gravity center 2.png org/case-0-13.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-13.png: org/case-0-13.png 2.png
	composite -gravity center 2.png org/case-0-13.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-13.png: org/case-0-13.png 3.png
	composite -gravity center 3.png org/case-0-13.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-13.png: org/case-0-13.png 3.png
	composite -gravity center 3.png org/case-0-13.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-14.png: org/case-0-14.png 1.png
	composite -gravity center 1.png org/case-0-14.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-14.png: org/case-0-14.png 1.png
	composite -gravity center 1.png org/case-0-14.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-14.png: org/case-0-14.png 2.png
	composite -gravity center 2.png org/case-0-14.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-14.png: org/case-0-14.png 2.png
	composite -gravity center 2.png org/case-0-14.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-14.png: org/case-0-14.png 3.png
	composite -gravity center 3.png org/case-0-14.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-14.png: org/case-0-14.png 3.png
	composite -gravity center 3.png org/case-0-14.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-15.png: org/case-0-15.png 1.png
	composite -gravity center 1.png org/case-0-15.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-15.png: org/case-0-15.png 1.png
	composite -gravity center 1.png org/case-0-15.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-15.png: org/case-0-15.png 2.png
	composite -gravity center 2.png org/case-0-15.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-15.png: org/case-0-15.png 2.png
	composite -gravity center 2.png org/case-0-15.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-15.png: org/case-0-15.png 3.png
	composite -gravity center 3.png org/case-0-15.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-15.png: org/case-0-15.png 3.png
	composite -gravity center 3.png org/case-0-15.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-16.png: org/case-0-16.png 1.png
	composite -gravity center 1.png org/case-0-16.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-16.png: org/case-0-16.png 1.png
	composite -gravity center 1.png org/case-0-16.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-16.png: org/case-0-16.png 2.png
	composite -gravity center 2.png org/case-0-16.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-16.png: org/case-0-16.png 2.png
	composite -gravity center 2.png org/case-0-16.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-16.png: org/case-0-16.png 3.png
	composite -gravity center 3.png org/case-0-16.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-16.png: org/case-0-16.png 3.png
	composite -gravity center 3.png org/case-0-16.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-17.png: org/case-0-17.png 1.png
	composite -gravity center 1.png org/case-0-17.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-17.png: org/case-0-17.png 1.png
	composite -gravity center 1.png org/case-0-17.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-17.png: org/case-0-17.png 2.png
	composite -gravity center 2.png org/case-0-17.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-17.png: org/case-0-17.png 2.png
	composite -gravity center 2.png org/case-0-17.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-17.png: org/case-0-17.png 3.png
	composite -gravity center 3.png org/case-0-17.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-17.png: org/case-0-17.png 3.png
	composite -gravity center 3.png org/case-0-17.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-18.png: org/case-0-18.png 1.png
	composite -gravity center 1.png org/case-0-18.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-18.png: org/case-0-18.png 1.png
	composite -gravity center 1.png org/case-0-18.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-18.png: org/case-0-18.png 2.png
	composite -gravity center 2.png org/case-0-18.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-18.png: org/case-0-18.png 2.png
	composite -gravity center 2.png org/case-0-18.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-18.png: org/case-0-18.png 3.png
	composite -gravity center 3.png org/case-0-18.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-18.png: org/case-0-18.png 3.png
	composite -gravity center 3.png org/case-0-18.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-19.png: org/case-0-19.png 1.png
	composite -gravity center 1.png org/case-0-19.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-19.png: org/case-0-19.png 1.png
	composite -gravity center 1.png org/case-0-19.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-19.png: org/case-0-19.png 2.png
	composite -gravity center 2.png org/case-0-19.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-19.png: org/case-0-19.png 2.png
	composite -gravity center 2.png org/case-0-19.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-19.png: org/case-0-19.png 3.png
	composite -gravity center 3.png org/case-0-19.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-19.png: org/case-0-19.png 3.png
	composite -gravity center 3.png org/case-0-19.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-20.png: org/case-0-20.png 1.png
	composite -gravity center 1.png org/case-0-20.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-20.png: org/case-0-20.png 1.png
	composite -gravity center 1.png org/case-0-20.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-20.png: org/case-0-20.png 2.png
	composite -gravity center 2.png org/case-0-20.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-20.png: org/case-0-20.png 2.png
	composite -gravity center 2.png org/case-0-20.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-20.png: org/case-0-20.png 3.png
	composite -gravity center 3.png org/case-0-20.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-20.png: org/case-0-20.png 3.png
	composite -gravity center 3.png org/case-0-20.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-21.png: org/case-0-21.png 1.png
	composite -gravity center 1.png org/case-0-21.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-21.png: org/case-0-21.png 1.png
	composite -gravity center 1.png org/case-0-21.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-21.png: org/case-0-21.png 2.png
	composite -gravity center 2.png org/case-0-21.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-21.png: org/case-0-21.png 2.png
	composite -gravity center 2.png org/case-0-21.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-21.png: org/case-0-21.png 3.png
	composite -gravity center 3.png org/case-0-21.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-21.png: org/case-0-21.png 3.png
	composite -gravity center 3.png org/case-0-21.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-22.png: org/case-0-22.png 1.png
	composite -gravity center 1.png org/case-0-22.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-22.png: org/case-0-22.png 1.png
	composite -gravity center 1.png org/case-0-22.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-22.png: org/case-0-22.png 2.png
	composite -gravity center 2.png org/case-0-22.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-22.png: org/case-0-22.png 2.png
	composite -gravity center 2.png org/case-0-22.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-22.png: org/case-0-22.png 3.png
	composite -gravity center 3.png org/case-0-22.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-22.png: org/case-0-22.png 3.png
	composite -gravity center 3.png org/case-0-22.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-23.png: org/case-0-23.png 1.png
	composite -gravity center 1.png org/case-0-23.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-23.png: org/case-0-23.png 1.png
	composite -gravity center 1.png org/case-0-23.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-23.png: org/case-0-23.png 2.png
	composite -gravity center 2.png org/case-0-23.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-23.png: org/case-0-23.png 2.png
	composite -gravity center 2.png org/case-0-23.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-23.png: org/case-0-23.png 3.png
	composite -gravity center 3.png org/case-0-23.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-23.png: org/case-0-23.png 3.png
	composite -gravity center 3.png org/case-0-23.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-1-24.png: org/case-0-24.png 1.png
	composite -gravity center 1.png org/case-0-24.png $@
	mogrify -interlace Plane -resize 50x $@

case-1x-24.png: org/case-0-24.png 1.png
	composite -gravity center 1.png org/case-0-24.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-2-24.png: org/case-0-24.png 2.png
	composite -gravity center 2.png org/case-0-24.png $@
	mogrify -interlace Plane -resize 50x $@

case-2x-24.png: org/case-0-24.png 2.png
	composite -gravity center 2.png org/case-0-24.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-3-24.png: org/case-0-24.png 3.png
	composite -gravity center 3.png org/case-0-24.png $@
	mogrify -interlace Plane -resize 50x $@

case-3x-24.png: org/case-0-24.png 3.png
	composite -gravity center 3.png org/case-0-24.png $@
	composite -gravity center croix.png $@ $@
	mogrify -interlace Plane -resize 50x $@

case-0-0.png: org/case-0-0.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-1.png: org/case-0-1.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-2.png: org/case-0-2.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-3.png: org/case-0-3.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-4.png: org/case-0-4.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-5.png: org/case-0-5.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-6.png: org/case-0-6.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-7.png: org/case-0-7.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-8.png: org/case-0-8.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-9.png: org/case-0-9.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-10.png: org/case-0-10.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-11.png: org/case-0-11.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-12.png: org/case-0-12.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-13.png: org/case-0-13.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-14.png: org/case-0-14.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-15.png: org/case-0-15.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-16.png: org/case-0-16.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-17.png: org/case-0-17.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-18.png: org/case-0-18.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-19.png: org/case-0-19.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-20.png: org/case-0-20.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-21.png: org/case-0-21.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-22.png: org/case-0-22.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-23.png: org/case-0-23.png
	convert -interlace Plane -resize 50x org/$@ $@

case-0-24.png: org/case-0-24.png
	convert -interlace Plane -resize 50x org/$@ $@

motif-0-1221.png: case-1-0.png case-2-1.png case-2-5.png case-1-6.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-0.png case-2-1.png case-2-5.png case-1-6.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1212.png: case-1-17.png case-2-18.png case-1-22.png case-2-23.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-17.png case-2-18.png case-1-22.png case-2-23.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1121.png: case-1-6.png case-1-7.png case-2-11.png case-1-12.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-6.png case-1-7.png case-2-11.png case-1-12.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1112.png: case-1-12.png case-1-13.png case-1-17.png case-2-18.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-12.png case-1-13.png case-1-17.png case-2-18.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2222.png: case-2-18.png case-2-19.png case-2-23.png case-2-24.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-18.png case-2-19.png case-2-23.png case-2-24.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2211.png: case-2-1.png case-2-2.png case-1-6.png case-1-7.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-1.png case-2-2.png case-1-6.png case-1-7.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2122.png: case-2-5.png case-1-6.png case-2-10.png case-2-11.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-5.png case-1-6.png case-2-10.png case-2-11.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2111.png: case-2-11.png case-1-12.png case-1-16.png case-1-17.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-11.png case-1-12.png case-1-16.png case-1-17.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1111.png: case-1-16.png case-1-17.png case-1-21.png case-1-22.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-16.png case-1-17.png case-1-21.png case-1-22.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1122.png: case-1-3.png case-1-4.png case-2-8.png case-2-9.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-3.png case-1-4.png case-2-8.png case-2-9.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1211.png: case-1-7.png case-2-8.png case-1-12.png case-1-13.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-7.png case-2-8.png case-1-12.png case-1-13.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-1222.png: case-1-13.png case-2-14.png case-2-18.png case-2-19.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-13.png case-2-14.png case-2-18.png case-2-19.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2112.png: case-2-2.png case-1-3.png case-1-7.png case-2-8.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-2.png case-1-3.png case-1-7.png case-2-8.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2121.png: case-2-15.png case-1-16.png case-2-20.png case-1-21.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-15.png case-1-16.png case-2-20.png case-1-21.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2212.png: case-2-8.png case-2-9.png case-1-13.png case-2-14.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-8.png case-2-9.png case-1-13.png case-2-14.png $@
	mogrify -interlace Plane -resize 85x $@

motif-0-2221.png: case-2-10.png case-2-11.png case-2-15.png case-1-16.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-10.png case-2-11.png case-2-15.png case-1-16.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1221.png: case-1-0.png case-2-1.png case-2-5.png case-1-6.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-0.png case-2-1.png case-2-5.png case-1-6.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1212.png: case-1-17.png case-2-18.png case-1-22.png case-2-23.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-17.png case-2-18.png case-1-22.png case-2-23.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1121.png: case-1-6.png case-1-7.png case-2-11.png case-1-12.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-6.png case-1-7.png case-2-11.png case-1-12.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1112.png: case-1-12.png case-1-13.png case-1-17.png case-2-18.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-12.png case-1-13.png case-1-17.png case-2-18.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2222.png: case-2-18.png case-2-19.png case-2-23.png case-2-24.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-18.png case-2-19.png case-2-23.png case-2-24.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2211.png: case-2-1.png case-2-2.png case-1-6.png case-1-7.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-1.png case-2-2.png case-1-6.png case-1-7.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2122.png: case-2-5.png case-1-6.png case-2-10.png case-2-11.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-5.png case-1-6.png case-2-10.png case-2-11.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2111.png: case-2-11.png case-1-12.png case-1-16.png case-1-17.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-11.png case-1-12.png case-1-16.png case-1-17.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1111.png: case-1-16.png case-1-17.png case-1-21.png case-1-22.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-16.png case-1-17.png case-1-21.png case-1-22.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1122.png: case-1-3.png case-1-4.png case-2-8.png case-2-9.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-3.png case-1-4.png case-2-8.png case-2-9.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1211.png: case-1-7.png case-2-8.png case-1-12.png case-1-13.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-7.png case-2-8.png case-1-12.png case-1-13.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-1222.png: case-1-13.png case-2-14.png case-2-18.png case-2-19.png
	montage -geometry 175x175+0+0 -tile 2x2 case-1-13.png case-2-14.png case-2-18.png case-2-19.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2112.png: case-2-2.png case-1-3.png case-1-7.png case-2-8.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-2.png case-1-3.png case-1-7.png case-2-8.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2121.png: case-2-15.png case-1-16.png case-2-20.png case-1-21.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-15.png case-1-16.png case-2-20.png case-1-21.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2212.png: case-2-8.png case-2-9.png case-1-13.png case-2-14.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-8.png case-2-9.png case-1-13.png case-2-14.png $@
	mogrify -interlace Plane -resize 85x $@

motif-1-2221.png: case-2-10.png case-2-11.png case-2-15.png case-1-16.png
	montage -geometry 175x175+0+0 -tile 2x2 case-2-10.png case-2-11.png case-2-15.png case-1-16.png $@
	mogrify -interlace Plane -resize 85x $@

icon.png: case-1-0.png case-2-1.png case-2-2.png case-1-3.png case-1-4.png case-2-5.png case-1-6.png case-1-7.png case-2-8.png case-2-9.png case-2-10.png case-2-11.png case-1-12.png case-1-13.png case-2-14.png case-2-15.png case-1-16.png case-1-17.png case-2-18.png case-2-19.png case-2-20.png case-1-21.png case-1-22.png case-2-23.png case-2-24.png
	montage -geometry +0+0 -tile 5x5 case-1-0.png case-2-1.png case-2-2.png case-1-3.png case-1-4.png case-2-5.png case-1-6.png case-1-7.png case-2-8.png case-2-9.png case-2-10.png case-2-11.png case-1-12.png case-1-13.png case-2-14.png case-2-15.png case-1-16.png case-1-17.png case-2-18.png case-2-19.png case-2-20.png case-1-21.png case-1-22.png case-2-23.png case-2-24.png tmp.png
	convert -interlace Plane -resize 48x48 tmp.png icon_48.png
	convert -interlace Plane -resize 64x64 tmp.png icon_64.png
	convert -interlace Plane -resize 128x128 tmp.png icon_128.png
	convert -interlace Plane -resize 192x192 tmp.png icon_192.png
	convert -interlace Plane -resize 256x256 tmp.png icon_256.png
	ln -sf icon_48.png $@
	@rm tmp.png

S.png: 0.png 0.png 1.png 1.png  0.png 1.png 0.png 0.png  0.png 0.png 1.png 0.png  0.png 0.png 0.png 1.png  0.png 1.png 1.png 0.png 
	montage -geometry +20+20 -background none -tile 4x5 0.png 0.png 1.png 1.png  0.png 1.png 0.png 0.png  0.png 0.png 1.png 0.png  0.png 0.png 0.png 1.png  0.png 1.png 1.png 0.png  tmp.png
	convert -resize x148 tmp.png $@
	@rm tmp.png

C.png: 0.png 0.png 2.png 2.png  0.png 2.png 0.png 0.png  0.png 2.png 0.png 0.png  0.png 2.png 0.png 0.png  0.png 0.png 2.png 2.png 
	montage -geometry +20+20 -background none -tile 4x5 0.png 0.png 2.png 2.png  0.png 2.png 0.png 0.png  0.png 2.png 0.png 0.png  0.png 2.png 0.png 0.png  0.png 0.png 2.png 2.png  tmp.png
	convert -resize x148 tmp.png $@
	@rm tmp.png

O.png: 0.png 0.png 1.png 0.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png  0.png 0.png 1.png 0.png 
	montage -geometry +20+20 -background none -tile 4x5 0.png 0.png 1.png 0.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png  0.png 0.png 1.png 0.png  tmp.png
	convert -resize x148 tmp.png $@
	@rm tmp.png

U.png: 0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 0.png 2.png 0.png 
	montage -geometry +20+20 -background none -tile 4x5 0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 2.png 0.png 2.png  0.png 0.png 2.png 0.png  tmp.png
	convert -resize x148 tmp.png $@
	@rm tmp.png

A.png: 0.png 0.png 1.png 0.png  0.png 1.png 0.png 1.png  0.png 1.png 1.png 1.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png 
	montage -geometry +20+20 -background none -tile 4x5 0.png 0.png 1.png 0.png  0.png 1.png 0.png 1.png  0.png 1.png 1.png 1.png  0.png 1.png 0.png 1.png  0.png 1.png 0.png 1.png  tmp.png
	convert -resize x148 tmp.png $@
	@rm tmp.png

