import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:masang/controllers/hemocentro_controller.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/pages/marcarDoacao.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Set<Marker> markers = Set();

  var geolocator = Geolocator();
  Position location;

  HemocentroController hemocentroController = HemocentroController();
  UserController usuarioController = new UserController();

  Future<Position> getLocation() async {
    await usuarioController.getUserInfo();
    var locator = await geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        locationPermissionLevel: GeolocationPermission.locationWhenInUse);
    location = locator;
    return locator;
  }

  Future<double> getDistanceBetween(Hemocentro hemocentro) async {
    var distance = await geolocator.distanceBetween(
        location.latitude,
        location.longitude,
        hemocentro.localizacao.latitude,
        hemocentro.localizacao.longitude);

    return distance;
  }

  Future _fetchMarkers() async {
    if (hemocentroController.listaHemocentros.length == 0) {
      await hemocentroController.listarHemocentros();
    }
    if (hemocentroController.listaHemocentros.length != 0) {
      for (int i = 0; i < hemocentroController.listaHemocentros.length; i++) {
        var marker = Marker(
            markerId: MarkerId(hemocentroController.listaHemocentros[i].nome),
            position: LatLng(
                hemocentroController.listaHemocentros[i].localizacao.latitude,
                hemocentroController.listaHemocentros[i].localizacao.longitude),
            visible: true,
            infoWindow: InfoWindow(
                title: hemocentroController.listaHemocentros[i].nome));
        markers.add(marker);
      }
    }
    return await getLocation();
  }

  GoogleMapController _mapController;

  Widget buildMap() {
    return Stack(children: <Widget>[
      GoogleMap(
        onMapCreated: (GoogleMapController controller) {
          _mapController = controller;
        },
        mapType: MapType.normal,
        initialCameraPosition: CameraPosition(
            target: LatLng(location.latitude, location.longitude),
            tilt: 0,
            zoom: 19.151926040649414),
        myLocationEnabled: true,
        tiltGesturesEnabled: true,
        zoomControlsEnabled: false,
        markers: markers,
      ),
    ]);
  }

  @override
  void initState() {
    super.initState();
    _fetchMarkers();
  }

  Future future;

  PanelController _panelController = new PanelController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisSize: MainAxisSize.max,
        children: <Widget>[
          Expanded(
            child: FutureBuilder(
                future: _fetchMarkers(),
                builder: (context, snapshot) {
                  if (!snapshot.hasError && snapshot.hasData) {
                    return SlidingUpPanel(
                      maxHeight: 600,
                      minHeight: 80,
                      header: Container(
                          height: 100,
                          color: Colors.white,
                          width: MediaQuery.of(context).size.width,
                          child: Column(
                            children: <Widget>[
                              SizedBox(height: 10),
                              Container(
                                color: Colors.grey[400],
                                width: 50,
                                height: 4,
                              ),
                              Align(
                                heightFactor: 2,
                                alignment: Alignment.center,
                                child: Text(
                                  "Hemocentros",
                                  style: TextStyle(
                                    fontSize: 28,
                                  ),
                                ),
                              )
                            ],
                          )),
                      panelBuilder: (ScrollController sc) => ListView.builder(
                        controller: sc,
                        itemCount: hemocentroController.listaHemocentros.length,
                        itemBuilder: (context, index) {
                          Future<double> distance = getDistanceBetween(
                              hemocentroController.listaHemocentros[index]);

                          return FutureBuilder(
                              future: distance,
                              builder: (context, snapshot) => snapshot.hasData
                                  ? Padding(
                                      padding: EdgeInsets.only(
                                          top: index == 0 ? 100 : 15),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          border: Border(
                                            bottom: BorderSide(
                                              width: 2,
                                              color: Colors.grey[200],
                                            ),
                                            top: index == 0
                                                ? BorderSide(
                                                    width: 2,
                                                    color: Colors.grey[200],
                                                  )
                                                : BorderSide(
                                                    width: 0,
                                                    color: Colors.white),
                                          ),
                                        ),
                                        child: ListTile(
                                          onTap: () async {
                                            _mapController.moveCamera(
                                              CameraUpdate.newLatLng(
                                                LatLng(
                                                  hemocentroController
                                                      .listaHemocentros[index]
                                                      .localizacao
                                                      .latitude,
                                                  hemocentroController
                                                      .listaHemocentros[index]
                                                      .localizacao
                                                      .longitude,
                                                ),
                                              ),
                                            );
                                            _panelController.close();
                                            _mapController.moveCamera(
                                              CameraUpdate.newLatLngZoom(
                                                LatLng(
                                                  hemocentroController
                                                      .listaHemocentros[index]
                                                      .localizacao
                                                      .latitude,
                                                  hemocentroController
                                                      .listaHemocentros[index]
                                                      .localizacao
                                                      .longitude,
                                                ),
                                                19.00,
                                              ),
                                            );
                                          },
                                          title: Row(
                                            children: <Widget>[
                                              SizedBox(
                                                width: 300,
                                                child: Text(
                                                  "${hemocentroController.listaHemocentros[index].nome}",
                                                  style: TextStyle(
                                                    fontSize: 16,
                                                    decoration: TextDecoration
                                                        .underline,
                                                    fontWeight: FontWeight.w400,
                                                  ),
                                                ),
                                              ),
                                              Text(
                                                  "${snapshot.data < 1000 ? snapshot.data.roundToDouble().toStringAsFixed(2) : (snapshot.data / 1000).round()} ${snapshot.data < 1000 ? 'm' : 'km'}"),
                                            ],
                                          ),
                                          subtitle: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: <Widget>[
                                              Text(
                                                "${hemocentroController.listaHemocentros[index].endereco.rua}  nº ${hemocentroController.listaHemocentros[index].endereco.numero}",
                                              ),
                                              FlatButton(
                                                onPressed: () {
                                                  Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                          builder:
                                                              (context) =>
                                                                  MarcarDoacao(
                                                                    hemocentro:
                                                                        hemocentroController
                                                                            .listaHemocentros[index],
                                                                    usuario:
                                                                        usuarioController
                                                                            .user,
                                                                  )));
                                                },
                                                child: Text(
                                                  "Doe agora",
                                                  style: TextStyle(
                                                      color: Theme.of(context)
                                                          .accentColor),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    )
                                  : CircularProgressIndicator());
                        },
                      ),
                      backdropEnabled: true,
                      body: buildMap(),
                      controller: _panelController,
                    );
                  } else {
                    return Center(child: CircularProgressIndicator());
                  }
                }),
          ),
        ],
      ),
    );
  }
}
