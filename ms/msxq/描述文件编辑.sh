#!/bin/sh
perl -p -i -e "s/插件的描述文字/See the date notes were created & modified \n 查看备忘录创建和修改时间/g"  cydia副本 sileo副本.json
#sileo 专属(划掉)，0717cydia终于也有作者名字了：作者名字
perl -p -i -e "s/bailu/gilshahar7/g" cydia副本 sileo副本.json

#支持系统
perl -p -i -e "s/---/12.0～13.6/g"  cydia副本 sileo副本.json
perl -p -i -e "s/1.0.0/1.0/g"  cydia副本 sileo副本.json
#更新时间
perl -p -i -e "s/2019-01-21/2020-05-31/g"  cydia副本 sileo副本.json
#perl -p -i -e "s/暂时没有历史版本/2019-05-04更新支持A12/g"  cydia副本
#截图
perl -p -i -e "s/yulanjietu.PNG/notesdate.jpeg/g"   cydia副本 sileo副本.json
#perl -p -i -e "s/2.png/linewhite2.jpeg/g"   sileo副本.json
#perl -p -i -e "s/3.png/linewhite3.jpeg/g"   sileo副本.json
#perl -p -i -e "s/4.png/linewhite4.jpeg/g"   sileo副本.json
#perl -p -i -e "s/yulanjietu.PNG/slices21.png/g"  cydia副本
mv cydia副本 notesdate
mv sileo副本.json notesdate.json


cp cydia样本 cydia副本
cp sileo样本.json sileo副本.json




