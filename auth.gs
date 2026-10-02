window.__ensureGoogleUser = async function(auth, fb){
  const first = await new Promise(r => { const u = auth.onAuthStateChanged(x => { u(); r(x); }); });
  if(first && !first.isAnonymous) return { user: first };
  const provider = new fb.auth.GoogleAuthProvider();
  try{
    return first ? await first.linkWithPopup(provider) : await auth.signInWithPopup(provider);
  }catch(e){
    if(e.code === "auth/credential-already-in-use" && e.credential) return await auth.signInWithCredential(e.credential);
    throw e;
  }
};
