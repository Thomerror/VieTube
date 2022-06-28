package com.midterm.exportkit.xd;
import java.util.HashMap;

import exportkit.xd.login_page_small_activity;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RetrofitInterface {

    @POST("/login")
    Call<login_page_small_activity> executeLogin(@Body HashMap<String, String>map);

    @POST("/signup")
    Call<Void> executeSignup(@Body HashMap<String, String>map);
}
