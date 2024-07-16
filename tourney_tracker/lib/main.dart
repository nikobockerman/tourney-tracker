import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:flutter/material.dart';
import 'package:amplify_api/amplify_api.dart';

import 'models/ModelProvider.dart';
import 'amplify_outputs.dart';

Future<void> main() async {
  try {
    WidgetsFlutterBinding.ensureInitialized();
    await _configureAmplify();
    runApp(const MyApp());
  } on AmplifyException catch (e) {
    runApp(Text("Error configuring Amplify: ${e.message}"));
  }
}

Future<void> _configureAmplify() async {
  try {
    await Amplify.addPlugins([
      AmplifyAuthCognito(),
      AmplifyAPI(
          options: APIPluginOptions(modelProvider: ModelProvider.instance)),
    ]);
    await Amplify.configure(amplifyConfig);
    safePrint('Successfully configured');
  } on Exception catch (e) {
    safePrint('Error configuring Amplify: $e');
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Authenticator(
        child: MaterialApp(
            builder: Authenticator.builder(),
            home: const SafeArea(
                child: Scaffold(
                    body: Column(children: [
              SignOutButton(),
              Expanded(child: MatchScreen())
            ]))),
            title: 'Tourney Tracker',
            theme: ThemeData(
              // This is the theme of your application.
              //
              // TRY THIS: Try running your application with "flutter run". You'll see
              // the application has a purple toolbar. Then, without quitting the app,
              // try changing the seedColor in the colorScheme below to Colors.green
              // and then invoke "hot reload" (save your changes or press the "hot
              // reload" button in a Flutter-supported IDE, or press "r" if you used
              // the command line to start the app).
              //
              // Notice that the counter didn't reset back to zero; the application
              // state is not lost during the reload. To reset the state, use hot
              // restart instead.
              //
              // This works for code too, not just values: Most code changes can be
              // tested with just a hot reload.
              colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
              useMaterial3: true,
            )));
  }
}

class MatchScreen extends StatefulWidget {
  const MatchScreen({super.key});

  @override
  State<MatchScreen> createState() => _MatchScreenState();
}

class _MatchScreenState extends State<MatchScreen> {
  List<Match> _matches = [];

  @override
  void initState() {
    super.initState();
    _refreshMatches();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        label: const Text('Add Random Match'),
        onPressed: () async {
          final newMatch = Match(
            teamHome: 'Team 1',
            teamAway: 'Team 2',
            startTime: TemporalDateTime.now(),
          );
          final request = ModelMutations.create(newMatch);
          final response = await Amplify.API.mutate(request: request).response;
          if (response.hasErrors) {
            safePrint('Creating Match failed.');
          } else {
            safePrint('Creating Match successful.');
          }
          _refreshMatches();
        },
      ),
      body: _matches.isEmpty == true
          ? const Center(child: Text("No matches", textAlign: TextAlign.center))
          : ListView.builder(
              itemCount: _matches.length,
              itemBuilder: (context, index) {
                final match = _matches[index];
                return Dismissible(
                    key: Key(match.id),
                    child: ListTile(
                      title: Text("${match.teamHome} - ${match.teamAway}"),
                      subtitle: Text(match.startTime.toString()),
                    ),
                    confirmDismiss: (direction) async {
                      if (direction != DismissDirection.endToStart) {
                        return false;
                      }

                      final request = ModelMutations.delete(match);
                      final response =
                          await Amplify.API.mutate(request: request).response;
                      if (response.hasErrors) {
                        safePrint('Deleting Match failed. ${response.errors}');
                        return false;
                      }

                      safePrint('Deleting Match successful.');
                      await _refreshMatches();
                      return true;
                    });
              },
            ),
    );
  }

  Future<void> _refreshMatches() async {
    try {
      final request = ModelQueries.list(Match.classType);
      final response = await Amplify.API.query(request: request).response;

      final matches = response.data?.items;
      if (response.hasErrors) {
        safePrint('errors: ${response.errors}');
        return;
      }
      setState(() {
        _matches = matches!.whereType<Match>().toList();
      });
    } on ApiException catch (e) {
      safePrint('Query failed: $e');
    }
  }
}
