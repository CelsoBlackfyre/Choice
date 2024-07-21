<?php

namespace App\Http\Controllers;

use App\Models\characters;
use Illuminate\Http\Request;

class CharactersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //creating the main page of the web app
        $characters = characters::all();
        return view('characters.index', compact('characters'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //Creating the character creation page
        return view('characters.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //creating and adding a character to the database
        $request->validate([
            'name' => 'required',
            'last_name' => 'required',
            'age' => 'required|integer|min:0',
            'gender' => 'required',
            'race' => 'required',
            'skin_color' => 'required',
            'body_type' => 'required',
            'eye_color' => 'required',
            'hair_style' => 'required',
            'hair_color' => 'required',
            'height' => 'required',
            'weight' => 'required',
            'description' => 'required',
            'traits' => 'required',
            'strenghts' => 'required',
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required',
            'birthplace' => 'required',
            'occupation' => 'required',
            'class' => 'required',
        ]);
        $character = new characters();
        $character->name = $request->name;
        $character->last_name = $request->last_name;
        $character->age = $request->age;
        $character->gender = $request->gender;
        $character->race = $request->race;
        $character->skin_color = $request->skin_color;
        $character->body_type = $request->body_type;
        $character->eye_color = $request->eye_color;
        $character->hair_style = $request->hair_style;
        $character->hair_color = $request->hair_color;
        $character->height = $request->height;
        $character->weight = $request->weight;
        $character->description = $request->description;
        $character->traits = $request->traits;
        $character->strengths = $request->strengths;
        $character->status = $request->status;
        $character->birthplace = $request->birthplace;
        $character->occupation = $request->occupation;
        $character->class = $request->class;

        //uploading the image
        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $filename);
            $character->image_url = $filename;
        }

        $character->save();
        return redirect('/characters');
    }

    /**
     * Display the specified resource.
     */
    public function show(characters $characters)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(characters $characters)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, characters $characters)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(characters $characters)
    {
        //
    }
}
