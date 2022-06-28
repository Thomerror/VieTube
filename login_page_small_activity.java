package com.midterm.exportkit.xd;

import android.app.Activity;
import android.app.AlertDialog;
import android.os.Bundle;


import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class login_page_small_activity extends Activity {

	private Retrofit retrofit;
	private RetrofitInterface retrofitInterface;
	private String BASE_URL = "";

	private View _bg__login_page_small_ek2;
	private View half_a_circle;
	private View invisible;
	private ImageView red_thing;
	private ImageView blue_thing;
	private TextView login;
	private TextView username_email;
	private TextView password;
	private TextView register;
	private TextView forgot_;
	private View line_number_1;
	private View line_2;
	private View __a_line_3;
	private View button;
	private ImageView arrow;
	private ImageView user;
	private ImageView lock;
	private View big_circle_red;
	private View big_circle_blue;
	private View small_circle_red;
	private View small_circle_blue;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_page_small);

		retrofit = new Retrofit.Builder()
				.baseUrl(BASE_URL)
				.addConverterFactory(GsonConverterFactory.create())
				.build();
		retrofitInterface = retrofit.create(RetrofitInterface.class);
		
		_bg__login_page_small_ek2 = (View) findViewById(R.id._bg__login_page_small_ek2);
		half_a_circle = (View) findViewById(R.id.half_a_circle);
		invisible = (View) findViewById(R.id.invisible);
		red_thing = (ImageView) findViewById(R.id.red_thing);
		blue_thing = (ImageView) findViewById(R.id.blue_thing);
		login = (TextView) findViewById(R.id.login);
		username_email = (TextView) findViewById(R.id.username_email);
		password = (TextView) findViewById(R.id.password);
		register = (TextView) findViewById(R.id.register);
		forgot_ = (TextView) findViewById(R.id.forgot_);
		line_number_1 = (View) findViewById(R.id.line_number_1);
		line_2 = (View) findViewById(R.id.line_2);
		__a_line_3 = (View) findViewById(R.id.__a_line_3);
		button = (View) findViewById(R.id.button);
		arrow = (ImageView) findViewById(R.id.arrow);
		user = (ImageView) findViewById(R.id.user);
		lock = (ImageView) findViewById(R.id.lock);
		big_circle_red = (View) findViewById(R.id.big_circle_red);
		big_circle_blue = (View) findViewById(R.id.big_circle_blue);
		small_circle_red = (View) findViewById(R.id.small_circle_red);
		small_circle_blue = (View) findViewById(R.id.small_circle_blue);


		findViewById(R.id.arrow).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				handleLoginDialog();
			}
		});
		findViewById(R.id.register).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				handleSignupDialog();
			}
		});
		findViewById(R.id.forgot_).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				handleResetDialog();
			}
		});

		private void handleLoginDialog() {
			View view = getLayoutInflater().inflate((R.layout.login_page_small, null);
			AlertDialog.Builder builder  = new AlertDialog.Builder(this);
			builder.setView(view).show();
			ImageView arrow = view.findViewById(R.id.login);
			EditText emailEdit = view.findViewById(R.id.login);
			EditText passwordEdit = view.findViewById(R.id.login);

			arrow.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View view) {

					HashMap<String, String>map = new HashMap<>();
					map.put("email",emailEdit.getText().toString());
					map.put("password",passwordEdit.getText().toString());

					Call<login_page_small_activity> call = retrofitInterface.executeLogin(map);
					call.enqueue(new Callback<login_page_small_activity>() {
						@Override
						public void onResponse(Call<login_page_small_activity> call, Response<login_page_small_activity> response) {

						}

						@Override
						public void onFailure(Call<login_page_small_activity> call, Throwable t) {
							Toast.makeText(login_page_small_activity.this,t.getMessage(),
									Toast.LENGTH_LONG).show();
						}
					});
				}
			});
		}
		private void handleSignupDialog() {
			View view = getLayoutInflater().inflate(R.layout.login_page_small,null);
			AlertDialog.Builder builder = new AlertDialog.Builder(this);
			builder.setView(view).show();
			TextView register = view.findViewById(R.id.register);
		}
		private void handleResetDialog() {

		}
	
	}
}
	
	