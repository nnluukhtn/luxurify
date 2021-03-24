import 'package:redux/redux.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux_hooks/flutter_redux_hooks.dart';
import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'package:flutter_hooks/flutter_hooks.dart'
    show HookWidget, useAnimationController, useState;
import 'package:awesome_application/application/store/states.dart';
import "package:awesome_application/application/store/main.dart";
// Views
import "package:awesome_application/application/widgets/scanner/main.dart";

class MyApp extends StatelessWidget {
  final Store<ApplicationRootState> store = getStore();

  @override
  Widget build(BuildContext context) {
    return StoreProvider<ApplicationRootState>(
        store: store,
        child: MaterialApp(
          title: 'Flutter Demo',
          theme: ThemeData(
            primarySwatch: Colors.blue,
            scaffoldBackgroundColor: Colors.white,
            visualDensity: VisualDensity.adaptivePlatformDensity,
          ),
          home: MyHomePage(title: 'Luxurify'),
        ));
  }
}

class MyHomePage extends HookWidget {
  MyHomePage({Key key, @required this.title}) : super(key: key);

  final String title;

  final iconList = <IconData>[
    Icons.brightness_5,
    Icons.brightness_4,
    Icons.brightness_6,
    Icons.brightness_7,
  ];

  @override
  Widget build(BuildContext context) {
    final _bottomNavIndex = useState(0);
    final _animationController =
        useAnimationController(duration: Duration(seconds: 3));

    return Scaffold(
      appBar: AppBar(
        title: Text(this.title),
      ),
      body: Center(child: Text("${_bottomNavIndex.value}")),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.qr_code_rounded),
        onPressed: () {
          _animationController.reset();
          _animationController.forward();
          scanQR();
        },
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: AnimatedBottomNavigationBar(
        icons: iconList,
        activeIndex: _bottomNavIndex.value,
        gapLocation: GapLocation.center,
        notchSmoothness: NotchSmoothness.softEdge,
        inactiveColor: Colors.grey,
        leftCornerRadius: 32,
        rightCornerRadius: 32,
        onTap: (index) => _bottomNavIndex.value = index,
        //other params
      ),
    );
  }
}
