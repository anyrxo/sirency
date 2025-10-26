/**
 * RAW COPY UPDATES - Real Talk for OF Creators
 * No BS. Just psychological warfare that makes them apply.
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    updateRawCopy();
  }

  function updateRawCopy() {
    // Hero Section - REAL TALK
    updateText('.herosection .heading-80', 'You\'re Leaving Money on the Table. And You Know It.');
    updateText('.herosection .sunheading-20', 'Other Girls With Your Same Followers Are Making 6 Figures. Here\'s What They Know That You Don\'t.');

    // Instagram CTA
    updateText('.instagram-eps .section-heading', 'She\'s Not Hotter Than You. She Just Knows Something You Don\'t.');
    updateBtn('.instagram-eps .button-primary', 'Show Me the System');

    // How We Work - Card 1
    updateText('.howwework .div-block-10:nth-child(1) .heading-86', 'You\'re One System Away from Freedom');
    updateHTML('.howwework .div-block-10:nth-child(1) .pricetext',
      `You're Already Doing the Work. You're Just Not Getting Paid What You're Worth.<br><br>You post every day. Reply to DMs. Try every "growth hack" from TikTok. And for what? A few hundred bucks? Maybe a thousand if you're lucky?<br><br>Meanwhile, girls with LESS followers than you are making $10k, $50k, $100k+ per month.<br><br>What's the difference? They stopped guessing. They got a system.<br><br><strong>We handle the boring shit so you can focus on being hot and making content.</strong> Every DM. Every post. Every funnel. Optimized to turn free followers into paying fans who throw money at you.<br><br>You do what you're good at. We make you rich.`
    );

    // How We Work - Card 2
    updateText('.howwework .div-block-10:nth-child(2) .heading-86', 'They\'re Watching. Are You Ready to Be Unforgettable?');
    updateHTML('.howwework .div-block-10:nth-child(2) .pricetext',
      `Your Audience Is Already There. You're Just Not Taking Their Money Yet.<br><br>Right now, there are men scrolling who WOULD pay you. They WANT to pay you. But your funnel is broken. Your messaging is weak. Your OnlyFans link is buried in your bio like you're embarrassed.<br><br>We don't do "engagement." We engineer OBSESSION.<br><br><strong>Every platform. Every post. Every move calculated to make them spend.</strong><br><br>Not followers. Not "engagement." <strong>Money.</strong> In your account. Every single day.`
    );

    // Power Section
    updateHTML('.powersection .heading-81', 'Why Some Girls Make Bank <span class="text-span">While You\'re Still Broke</span>');
    updateHTML('.powersection .heading-82',
      `<span class="text-span-5">Let's be honest. You see girls with the same body, same content, making 10x what you make. And it pisses you off.<br><br>It should.<br><br>Because it's not fair. You're doing the work. You're posting. You're hot. <strong>So why aren't you rich yet?</strong><br><br>Here's the truth most agencies won't tell you: <strong>It's not about trying harder. It's about the system.</strong></span><span></span><span class="text-span-6"><br><br>Most agencies treat you like a transaction. Take 20%, ghost you when shit gets hard, leave you with the same broke problems you started with.<br><br>We're different.<br><br>We don't just "manage your account." We build <strong>money-printing machines.</strong></span><span></span><span><br><br>In December 2023, we completely rebuilt our system. Not tweaked. <strong>Rebuilt.</strong> From the ground up.<br><br>The result? Our girls don't have "good months" anymore. They have <strong>consistent, predictable, bankable income.</strong> Every. Single. Month.<br><br>While other agencies are chasing viral moments and praying to the algorithm, we're engineering results.<br><br><strong>You don't need to work harder. You need to work with people who actually know what the fuck they're doing.</strong><br><br>And baby, we know.</span>`
    );

    // For Creator Elite
    updateText('.creatorwrap .heading1', 'You\'re Not Like Everyone Else. Stop Settling for Basic.');
    updateHTML('.creatorwrap .text1',
      `You didn't start this to be average. So why are you taking average money?<br><br>We don't just grow your OnlyFans. We position you as <strong>untouchable.</strong><br><br>Brand deals. VIP opportunities. Exclusive partnerships that other girls don't even know exist.<br><br>This is where creators stop being "content creators" and start being <strong>brands.</strong><br><br><strong>Are you ready to be treated like one?</strong>`
    );

    // Member Access CTA
    updateText('.memberaccess .heading2.heading', 'What If This Time Next Month, You\'re Making More Than Your Ex Ever Did?');
    updateBtn('.memberaccess .button-primary', 'I\'m Ready to Win');

    // Results
    updateHTML('.trip-around .heading-87', 'These Girls Were Broke Too. <span class="text-span-4">Now Look.</span>');
    updateText('.trip-around .paragraph', 'They Had the Same Doubts You Do. Then They Applied.');

    // Testimonial
    updateHTML('.memberaccess.member-access-2 .heading2',
      `"I was about to quit. I was doing EVERYTHING—posting 3x a day, replying to every DM, trying every stupid growth trick from Reddit. And I was still making like $2k/month.<br><br>Then I found SirenCY.<br><br>I didn't believe them at first. I'd tried 3 other agencies and they all sucked. But I had nothing to lose.<br><br>Now I'm at $130k/month. And I barely post anymore.<br><br>If you're reading this thinking "is this real?"—it is. And if you don't apply, you're gonna watch some other girl blow up using this exact system while you're still stuck at $3k/month wondering what she has that you don't.<br><br>She has <strong>us.</strong> That's it."`
    );

    // Before/After
    updateText('.before-after .heading-88', 'From Struggling to Unstoppable');

    // Case Study 1 - Chelsea
    updateText('.subfee .freewap-trial:nth-of-type(1) .priceheading.priceheading2', '$0 to $130k/Month. No Followers. No Experience. Just the System.');
    updateHTML('.subfee .freewap-trial:nth-of-type(1) .divblock1:nth-of-type(1) .pricetext',
      `Chelsea was broke. Like actually broke. Working a regular job, posting on the side, making basically nothing.<br><br>Zero followers. Zero clue what she was doing. Just knew she was hot and figured she could make money somehow.<br><br>Most agencies would've ignored her. "Come back when you have 10k followers." That's what they all say.<br><br>We took her from <strong>literally zero</strong> to <strong>$130k/month</strong> in less than a year.<br><br>No ads. No bullshit. Just the exact system we use for every girl who makes bank with us.<br><br><strong>The only difference between Chelsea and you? She applied.</strong>`
    );
    updateHTML('.subfee .freewap-trial:nth-of-type(1) .divblock1:nth-of-type(2) .pricetext',
      `"Everyone told me I was too late. The market was "saturated." I'd never make real money.<br><br>Fuck that.<br><br>SirenCY showed me the exact playbook. Step by step. And now I make more in a month than I used to make in a year at my old job.<br><br>If you're on the fence, here's your sign: <strong>Stop waiting. Apply. You're already late enough.</strong>"`
    );

    // Case Study 2
    updateText('.subfee .free-trial-2 .priceheading.priceheading2', '3,000 New Subs Every Week. Here\'s How She Did It.');
    updateHTML('.subfee .free-trial-2 .divblock1:nth-of-type(1) .pricetext',
      `She was doing everything "right."<br><br>Posting every day. Engaging with followers. Trying all the tips from YouTube and TikTok.<br><br>And she was STILL broke.<br><br>Here's what nobody tells you: <strong>Effort doesn't equal money. Strategy does.</strong><br><br>We rebuilt her funnel. Fixed her content. Optimized every step from scroll to subscribe.<br><br>One week later? <strong>3,000 new PAYING subscribers.</strong> Not followers. Subscribers.<br><br>Every. Single. Week.<br><br>This isn't luck. It's science.`
    );
    updateHTML('.subfee .free-trial-2 .divblock1:nth-of-type(2) .pricetext',
      `"Before SirenCY, I thought <strong>I</strong> was the problem. Like maybe I wasn't hot enough or my content sucked.<br><br>Nope. My <strong>strategy</strong> sucked.<br><br>They fixed everything I couldn't see. Now I'm making thousands of dollars a week on autopilot.<br><br>If you're working your ass off and still broke, it's not you. It's your system. Fix the system. Get rich."`
    );

    // Case Study 3 - Ruby
    updateText('.subfee .free-trial-3 .priceheading.priceheading2', 'A New Subscriber Every Minute. Yes, Really.');
    updateHTML('.subfee .free-trial-3 .divblock1:nth-of-type(1) .pricetext',
      `Ruby almost quit.<br><br>Her last agency left her with broken funnels, no results, and zero confidence that this shit would ever work.<br><br>She thought maybe it just "wasn't for her."<br><br>Then we rebuilt everything. New strategy. New systems. New funnels.<br><br>Now she gets <strong>a new subscriber every 60 seconds.</strong><br><br>Not views. Not likes. <strong>Paying subscribers.</strong> Every minute of every day.<br><br>That's not virality. That's a <strong>machine that prints money.</strong>`
    );
    updateHTML('.subfee .free-trial-3 .divblock1:nth-of-type(2) .pricetext',
      `"My last agency made me feel stupid. Like I was doing something wrong.<br><br>SirenCY made me feel <strong>unstoppable.</strong><br><br>Every minute I check my phone and there's a new subscriber. It doesn't stop. I didn't think this was real.<br><br>I was so fucking wrong. And I've never been happier to be wrong."`
    );

    // Location CTA
    updateHTML('.location .pricetext.v2.v3',
      'You Could Wake Up Tomorrow to More Money in Your Account Than You Made All Month. Or You Could Keep Doing What You\'re Doing.'
    );
    updateBtn('.location .button-primary', 'Stop Playing Small');

    // Case Study CTA
    updateBtn('.casestudies .button-primary', 'I\'m Ready to Win');

    // All remaining Apply buttons
    updateAllBtns();
  }

  function updateText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function updateHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function updateBtn(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function updateAllBtns() {
    const btns = document.querySelectorAll('.button-primary');
    btns.forEach(btn => {
      const txt = btn.textContent.trim().toLowerCase();
      if (txt.includes('apply') || txt === 'show me how') {
        btn.textContent = 'I\'m Ready to Win';
      }
    });
  }
})();
